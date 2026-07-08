const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = process.env.PORT || 3000;

// /tmp é a única pasta com permissão de escrita no Vercel Serverless
const TMP_DIR = '/tmp';

app.use(cors());
app.use(express.json());

// ─── MULTER CONFIG (memoryStorage para compatibilidade com Vercel) ───
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') return cb(null, true);
        cb(new Error('Apenas arquivos PDF são aceitos.'));
    },
});

// ─── CTPS LOGIC ───
async function extractText(buffer) {
    // 1. Tenta pdf-parse direto no buffer (não precisa de arquivo em disco)
    try {
        const data = await pdfParse(buffer);
        if (data.text && data.text.trim().length > 100) {
            return { text: data.text, method: 'pdf-parse' };
        }
    } catch (err) {
        console.warn('[pdf-parse] Falhou:', err.message);
    }

    // 2. Fallback: Tesseract OCR - precisa de arquivo temporário em /tmp
    const tmpPath = path.join(TMP_DIR, `ctps_${Date.now()}.pdf`);
    try {
        fs.writeFileSync(tmpPath, buffer);
        console.log('[Tesseract] Iniciando OCR em:', tmpPath);
        const { data: { text } } = await Tesseract.recognize(tmpPath, 'por', {
            langPath: path.join(__dirname, '..'),
        });
        if (text && text.trim().length > 50) {
            return { text, method: 'tesseract-ocr' };
        }
    } catch (err) {
        console.warn('[Tesseract] Falhou:', err.message);
    } finally {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }

    throw new Error('Não foi possível extrair texto do PDF.');
}

function parseCTPS(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const nome = lines.find(l => /^[A-ZÀ-Ú\s]{5,}$/.test(l) && !/nome|civil|dados|pessoais/i.test(l)) || null;

    // Busca data de nascimento
    let dataNascimento = null;
    const nascIdx = lines.findIndex(l => /nascimento/i.test(l));
    if (nascIdx !== -1) {
        // Varre linhas próximas
        for (let j = nascIdx; j <= nascIdx + 3 && j < lines.length; j++) {
            const m = lines[j].match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
            if (m) { dataNascimento = m[1]; break; }
        }
    }
    // Fallback: Procura qualquer data no formato DD/MM/YYYY que pareça ser a primeira do documento (geralmente nascimento)
    if (!dataNascimento) {
        const firstDate = text.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
        if (firstDate) dataNascimento = firstDate[1];
    }
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

            contracts.push({ empresa, cargo, admissao, demissao });
        }
    }
    return { dadosPessoais: { nome, dataNascimento }, contratos: contracts };
}

// ─── ROUTES ───
// Rota de Health Check para confirmar que o servidor está vivo
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Rota de Upload unificada
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
    console.log('[API] Recebendo arquivo para processamento...');
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

    try {
        // req.file.buffer disponível graças ao memoryStorage
        const { text, method } = await extractText(req.file.buffer);
        const result = parseCTPS(text);

        console.log(`[API] Sucesso! Texto extraído via: ${method}`);
        res.json({ success: true, method, ...result });
    } catch (err) {
        console.error('[API] Erro no processamento:', err.message);
        res.status(422).json({ error: err.message });
    }
});

// ─── STATIC FRONTEND ───
const DIST = path.join(__dirname, '..', '..', 'frontend-react', 'dist');

// Servir arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(DIST));

// Redirecionar qualquer outra rota para o index.html (suporte a SPA)
// Usando um padrão mais seguro para Express 5
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(DIST, 'index.html'));
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n🚀 ATS Generator Unificado online!`);
        console.log(`🔗 Interface: http://localhost:${PORT}`);
        console.log(`📡 API: http://localhost:${PORT}/api/health\n`);
    });
}

module.exports = app;
