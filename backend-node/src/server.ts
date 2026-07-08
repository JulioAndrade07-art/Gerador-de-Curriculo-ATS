import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import XLSX from 'xlsx';
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
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') return cb(null, true);
        cb(new Error('Apenas arquivos PDF são aceitos.'));
    },
});

// ─── CTPS LOGIC ───
async function extractText(filePath: string) {
    try {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        if (data.text && data.text.trim().length > 100) {
            return { text: data.text, method: 'pdf-parse' };
        }
    } catch (err: any) {
        console.warn('[pdf-parse] Falhou:', err.message);
    }

    try {
        console.log('[Tesseract] Iniciando OCR...');
        const { data: { text } } = await Tesseract.recognize(filePath, 'por');
        if (text && text.trim().length > 50) {
            return { text, method: 'tesseract-ocr' };
        }
    } catch (err: any) {
        console.warn('[Tesseract] Falhou:', err.message);
    }

    throw new Error('Não foi possível extrair texto do PDF.');
}

function normalizeDate(raw: string | null) {
    if (!raw) return null;
    const clean = raw.trim();
    const m1 = clean.match(/^(\d{2})\/(\d{2})\/(\d{2,4})$/);
    if (m1) {
        const year = m1[3].length === 2 ? '20' + m1[3] : m1[3];
        return `${m1[1]}/${m1[2]}/${year}`;
    }
    return clean;
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

app.post('/api/upload', upload.single('pdf'), async (req: any, res: any) => {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    try {
        const { text, method } = await extractText(req.file.path);
        const result = parseCTPS(text);
        res.json({ success: true, method, ...result });
    } catch (err: any) {
        res.status(422).json({ error: err.message });
    } finally {
        fs.unlink(req.file.path, () => { });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Unificado rodando na porta ${PORT}`);
});
