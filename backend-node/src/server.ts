import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer, { MulterError } from 'multer';
import path from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
// @ts-ignore
import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors());
app.use(express.json());

// ─── RATE LIMITER (10 requisições por 15 minutos por IP) ───
const ctpsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Muitas tentativas de envio. Por favor, aguarde 15 minutos antes de tentar novamente.' }
});

// ─── MULTER CONFIG ───
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite rigoroso de 5 MB
    fileFilter: (req, file, cb) => {
        const isPdfMime = file.mimetype === 'application/pdf';
        const isPdfExt = path.extname(file.originalname).toLowerCase() === '.pdf';

        if (isPdfMime || isPdfExt) {
            return cb(null, true);
        }
        cb(new Error('Apenas arquivos no formato PDF são aceitos.'));
    },
});

// ─── CTPS LOGIC ───
async function extractText(filePath: string) {
    try {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        if (data.text && data.text.trim().length > 50) {
            return { text: data.text, method: 'pdf-parse' };
        }
    } catch (err: any) {
        console.warn('[pdf-parse] Falhou ao ler PDF:', err.message);
    }

    try {
        console.log('[Tesseract] Tentando fallback de OCR...');
        const { data: { text } } = await Tesseract.recognize(filePath, 'por');
        if (text && text.trim().length > 30) {
            return { text, method: 'tesseract-ocr' };
        }
    } catch (err: any) {
        console.warn('[Tesseract] Falhou:', err.message);
    }

    throw new Error('Não foi possível extrair o texto do arquivo PDF. Verifique se o arquivo não está corrompido ou protegido por senha.');
}

function parseDateBR(str: string | null) {
    if (!str) return null;
    const [d, m, y] = str.split('/').map(Number);
    return new Date(y, m - 1, d);
}

function calcDuration(startStr: string, endStr: string | null) {
    const start = parseDateBR(startStr);
    const end = endStr ? parseDateBR(endStr) : new Date();
    if (!start || !end || end < start) return 'Inválido';
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) { years--; months += 12; }
    return `${years > 0 ? years + ' ano' + (years > 1 ? 's' : '') : ''} ${months > 0 ? months + ' mês' + (months > 1 ? 'es' : '') : ''}`.trim() || 'Menos de 1 mês';
}

function parseCTPS(text: string) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const nome = lines.find(l => /^[A-ZÀ-Ú\s]{5,}$/.test(l) && !/nome|civil/i.test(l)) || null;

    const blockStartRe = /^(\d{2})\/(\d{2})\/(\d{4})\s*[-–]\s*(\d{2}\/\d{2}\/\d{4}|Aberto|Atual)$/i;
    const contracts = [];

    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(blockStartRe);
        if (m) {
            const admissao = `${m[1]}/${m[2]}/${m[3]}`;
            const demissaoRaw = m[4];
            const demissao = demissaoRaw.match(/\d/) ? demissaoRaw : null;

            const block = lines.slice(i + 1, i + 15);
            const empresa = block.find((_, idx) => block[idx - 1]?.toLowerCase() === 'empregador') || 'Empresa';
            const cargo = block.find((_, idx) => block[idx - 1]?.toLowerCase() === 'cargo') || 'Cargo';

            contracts.push({
                empresa, cargo, admissao, demissao,
                tempo: calcDuration(admissao, demissao)
            });
        }
    }

    return { dadosPessoais: { nome }, contratos: contracts };
}

// ─── ROUTES ───
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API unificada v1.0' });
});

app.post('/api/upload', ctpsLimiter, (req: Request, res: Response, next: NextFunction) => {
    upload.single('pdf')(req, res, (err: any) => {
        if (err instanceof MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ error: 'O arquivo PDF excede o tamanho máximo permitido de 5 MB.' });
            }
            return res.status(400).json({ error: `Erro no upload: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

    try {
        const { text, method } = await extractText(req.file.path);
        const result = parseCTPS(text);
        res.json({ success: true, method, ...result });
    } catch (err: any) {
        res.status(422).json({ error: err.message || 'Erro ao processar PDF da Carteira de Trabalho.' });
    } finally {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlink(req.file.path, () => { });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Unificado rodando na porta ${PORT}`);
});
