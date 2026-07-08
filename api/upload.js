const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const fs = require('fs');

// Instala dependências dinamicamente na primeira execução serverless
// (as deps do backend-node precisam estar em api/ ou no root package.json)

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') return cb(null, true);
        cb(new Error('Apenas arquivos PDF são aceitos.'));
    },
});

// Helper para rodar multer num contexto serverless
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}

function parseCTPS(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const nome = lines.find(l => /^[A-ZÀ-Ú\s]{5,}$/.test(l) && !/nome|civil|dados|pessoais/i.test(l)) || null;

    let dataNascimento = null;
    const nascIdx = lines.findIndex(l => /nascimento/i.test(l));
    if (nascIdx !== -1) {
        for (let j = nascIdx; j <= nascIdx + 3 && j < lines.length; j++) {
            const m = lines[j].match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
            if (m) { dataNascimento = m[1]; break; }
        }
    }
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

module.exports = async (req, res) => {
    // Habilita CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });

    try {
        await runMiddleware(req, res, upload.single('pdf'));
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

    try {
        const data = await pdfParse(req.file.buffer);
        if (!data.text || data.text.trim().length < 50) {
            throw new Error('Não foi possível extrair texto suficiente do PDF. O arquivo pode ser uma imagem escaneada — o OCR não está disponível neste ambiente.');
        }
        const result = parseCTPS(data.text);
        return res.json({ success: true, method: 'pdf-parse', ...result });
    } catch (err) {
        return res.status(422).json({ error: err.message });
    }
};
