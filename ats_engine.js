// ==================== ATS ENGINE ====================

// ---- SCORE ATS ----
function calcularScoreATS(d, areaKey, vagaTexto, descricaoVaga) {
    let score = 0;
    const detalhes = { ok: [], avisos: [], criticos: [] };

    // Nome (5pts)
    if (d.nome && d.nome.trim().split(' ').length >= 2) {
        score += 5; detalhes.ok.push('Nome completo preenchido');
    } else {
        detalhes.criticos.push('Preencha seu nome completo (nome e sobrenome)');
    }

    // Contato (10pts)
    if (d.email) { score += 5; detalhes.ok.push('E-mail informado'); }
    else { detalhes.avisos.push('Adicione um e-mail profissional'); }
    if (d.tel) { score += 5; detalhes.ok.push('Telefone/WhatsApp informado'); }
    else { detalhes.avisos.push('Adicione um número de contato'); }

    // Cidade (5pts)
    if (d.cidade) { score += 5; detalhes.ok.push('Localização informada'); }
    else { detalhes.avisos.push('Informe sua cidade e estado'); }

    // Resumo (20pts)
    if (d.resumo) {
        const palavras = d.resumo.trim().split(/\s+/).length;
        if (palavras >= 40) { score += 20; detalhes.ok.push('Resumo profissional completo'); }
        else if (palavras >= 20) { score += 10; detalhes.avisos.push('Resumo profissional pode ser mais detalhado (mín. 40 palavras)'); }
        else { score += 5; detalhes.avisos.push('Resumo muito curto — expanda com palavras-chave da área'); }
    } else {
        detalhes.criticos.push('Resumo profissional não preenchido — campo essencial para ATS');
    }

    // Experiências (20pts)
    if (d.experiencias.length === 0) {
        detalhes.avisos.push('Adicione ao menos uma experiência profissional');
    } else {
        score += 10;
        const temDescricoes = d.experiencias.every(e => e.bullets && e.bullets.trim().length > 30);
        if (temDescricoes) { score += 10; detalhes.ok.push('Experiências com descrições detalhadas'); }
        else { detalhes.avisos.push('Detalhe mais as atividades de cada experiência'); }
    }

    // Formação (10pts)
    if (d.formacoes.length > 0) { score += 10; detalhes.ok.push('Formação acadêmica informada'); }
    else { detalhes.avisos.push('Adicione sua formação acadêmica'); }

    // Habilidades (15pts)
    if (d.habTech && d.habTech.trim().split('\n').filter(x => x.trim()).length >= 3) {
        score += 10; detalhes.ok.push('Habilidades técnicas preenchidas');
    } else {
        detalhes.avisos.push('Adicione ao menos 3 habilidades técnicas específicas');
    }
    if (d.habSoft && d.habSoft.trim().split('\n').filter(x => x.trim()).length >= 3) {
        score += 5; detalhes.ok.push('Habilidades comportamentais preenchidas');
    } else {
        detalhes.avisos.push('Adicione competências comportamentais relevantes para a área');
    }

    // LinkedIn / GitHub (10pts)
    if (d.linkedin) { score += 7; detalhes.ok.push('LinkedIn informado'); }
    else { detalhes.avisos.push('Perfis com LinkedIn têm +40% de chance de aprovação'); }
    if (d.github) { score += 3; detalhes.ok.push('GitHub informado'); }

    // Análise de palavras-chave da área (5pts bônus)
    if (areaKey && ATS_AREAS[areaKey]) {
        const area = ATS_AREAS[areaKey];
        const textoCV = `${d.resumo} ${d.habTech} ${d.habSoft} ${d.experiencias.map(e => e.bullets).join(' ')}`.toLowerCase();
        const matchedKeys = area.tecnicas.filter(k => textoCV.includes(k.toLowerCase()));
        if (matchedKeys.length >= 5) { score += 5; detalhes.ok.push(`${matchedKeys.length} palavras-chave da área identificadas`); }
        else if (matchedKeys.length > 0) { detalhes.avisos.push(`Apenas ${matchedKeys.length} palavras-chave da área encontradas. Use termos como: ${area.tecnicas.slice(0, 3).join(', ')}`); }
        else { detalhes.criticos.push(`Nenhuma palavra-chave da área "${area.label}" encontrada no currículo`); }
    }

    // Análise da descrição da vaga
    if (descricaoVaga && descricaoVaga.trim().length > 20) {
        const keywords = extrairKeywordsVaga(descricaoVaga);
        const textoCV = `${d.resumo} ${d.habTech} ${d.habSoft} ${d.experiencias.map(e => e.bullets).join(' ')}`.toLowerCase();
        const matched = keywords.filter(k => textoCV.includes(k.toLowerCase()));
        const coverage = Math.round((matched.length / Math.max(keywords.length, 1)) * 100);
        if (coverage >= 60) { detalhes.ok.push(`Compatibilidade com a vaga: ${coverage}%`); }
        else { detalhes.avisos.push(`Compatibilidade com a vaga: ${coverage}% — Inclua mais termos da descrição da vaga`); }
    }

    return { score: Math.min(score, 100), detalhes };
}

// ---- ANÁLISE DE VAGA ----
function detectarAreaPorVaga(textoVaga) {
    const t = textoVaga.toLowerCase();
    if (/estoque|almoxarif|logíst|conferente|expediç|armazenagem/i.test(t)) return 'logistica';
    if (/administrat|escritório|documentos|relatório|office|contratos/i.test(t)) return 'administracao';
    if (/atendimento|cliente|sac|suporte|recepç|call center/i.test(t)) return 'atendimento';
    if (/ti|tecnologia|desenvolv|programaç|software|sistema|analista|banco de dados/i.test(t)) return 'ti';
    if (/produç|operacional|montagem|industrial|máquina|fábrica/i.test(t)) return 'producao';
    return null;
}

function extrairKeywordsVaga(descricao) {
    // Tokenize e remove stopwords básicas em português
    const stopwords = new Set([
        'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
        'e', 'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
        'para', 'com', 'por', 'que', 'se', 'é', 'ao', 'aos', 'seu', 'sua',
        'ou', 'ser', 'ter', 'como', 'mais', 'já', 'bem', 'bom', 'boa',
        'além', 'entre', 'quando', 'onde', 'também', 'sobre', 'até'
    ]);
    return descricao
        .toLowerCase()
        .replace(/[^\w\sáéíóúãõâêôàçüñ]/gi, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3 && !stopwords.has(w))
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 40);
}

// ---- AUTO-PREENCHIMENTO ----
function autoPreencherPorArea(areaKey) {
    if (!ATS_AREAS[areaKey]) return;
    const area = ATS_AREAS[areaKey];
    const confirmar = confirm(`Deseja preencher automaticamente com conteúdo ATS otimizado para "${area.label}"?\n\nIsso irá substituir: Resumo profissional, Habilidades técnicas e Habilidades complementares.`);
    if (!confirmar) return;

    document.getElementById('resumo').value = area.resumo;
    dados.resumo = area.resumo;

    document.getElementById('hab-tech').value = area.tecnicas.join('\n');
    dados.habTech = area.tecnicas.join('\n');

    document.getElementById('hab-soft').value = area.comportamentais.join('\n');
    dados.habSoft = area.comportamentais.join('\n');

    atualizar();
    atualizarPainelATS();
    mostrarToast('✅ Conteúdo ATS preenchido para ' + area.label);
}

// ---- REESCRITOR ----
function reescreverExperiencia(texto) {
    let resultado = texto;
    ATS_REESCRITOR.padroes.forEach(p => {
        if (p.regex.test(resultado)) {
            resultado = resultado.replace(p.regex, p.saida);
        }
    });
    return resultado;
}

// ---- PAINEL ATS ----
function atualizarPainelATS() {
    const areaKey = document.getElementById('ats-area') ? document.getElementById('ats-area').value : null;
    const vagaTexto = document.getElementById('ats-vaga') ? document.getElementById('ats-vaga').value : '';
    const descricaoVaga = document.getElementById('ats-descricao') ? document.getElementById('ats-descricao').value : '';

    const resultado = calcularScoreATS(dados, areaKey, vagaTexto, descricaoVaga);
    const score = resultado.score;
    const det = resultado.detalhes;

    // Score visual
    const scoreEl = document.getElementById('ats-score-valor');
    const scoreBarEl = document.getElementById('ats-score-bar');
    const scoreLabelEl = document.getElementById('ats-score-label');
    if (!scoreEl) return;

    scoreEl.textContent = score;
    scoreBarEl.style.width = score + '%';

    let cor, label;
    if (score >= 80) { cor = '#1a7a4a'; label = 'Excelente'; }
    else if (score >= 60) { cor = '#d97706'; label = 'Bom'; }
    else if (score >= 40) { cor = '#ea580c'; label = 'Regular'; }
    else { cor = '#dc2626'; label = 'Fraco'; }

    scoreBarEl.style.background = cor;
    scoreLabelEl.textContent = label;
    scoreLabelEl.style.color = cor;

    // Detalhes
    const listEl = document.getElementById('ats-score-detalhes');
    listEl.innerHTML = '';

    det.ok.forEach(m => {
        listEl.innerHTML += `<div class="ats-item ats-ok">✓ ${m}</div>`;
    });
    det.avisos.forEach(m => {
        listEl.innerHTML += `<div class="ats-item ats-aviso">⚠ ${m}</div>`;
    });
    det.criticos.forEach(m => {
        listEl.innerHTML += `<div class="ats-item ats-critico">✕ ${m}</div>`;
    });

    // Palavras-chave da vaga
    if (descricaoVaga.trim().length > 20) {
        const keywords = extrairKeywordsVaga(descricaoVaga);
        const textoCV = `${dados.resumo} ${dados.habTech} ${dados.habSoft}`.toLowerCase();
        const kwEl = document.getElementById('ats-keywords');
        if (kwEl) {
            kwEl.innerHTML = keywords.map(k => {
                const match = textoCV.includes(k.toLowerCase());
                return `<span class="kw-tag ${match ? 'kw-match' : 'kw-miss'}">${k}</span>`;
            }).join('');
        }
        document.getElementById('ats-keywords-section').style.display = 'block';
    } else {
        const kwSec = document.getElementById('ats-keywords-section');
        if (kwSec) kwSec.style.display = 'none';
    }
}

// ---- TOOLTIP ATS ----
function initTooltipsATS() {
    const campos = Object.keys(ATS_DICAS_CAMPOS);
    campos.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const dica = ATS_DICAS_CAMPOS[id];

        el.addEventListener('focus', () => mostrarBalaoDica(el, dica));
    });

    // dicas dinâmicas por área nos campos de experiência/resumo
    document.addEventListener('focusin', e => {
        const areaKey = document.getElementById('ats-area') ? document.getElementById('ats-area').value : null;
        if (!areaKey || !ATS_AREAS[areaKey]) return;
        const area = ATS_AREAS[areaKey];

        if (e.target.id === 'resumo' && area.dicaCampos.resumo) {
            mostrarBalaoDica(e.target, {
                titulo: '📝 Dica ATS — Resumo para ' + area.label,
                dica: area.dicaCampos.resumo,
                nivel: 'importante'
            });
        }
    });
}

function mostrarBalaoDica(el, dica) {
    let balao = document.getElementById('ats-balao');
    if (!balao) {
        balao = document.createElement('div');
        balao.id = 'ats-balao';
        document.body.appendChild(balao);
    }

    const nivelCor = { 'info': '#1F3864', 'importante': '#d97706', 'dica': '#1a7a4a' };
    const cor = nivelCor[dica.nivel] || '#1F3864';

    balao.innerHTML = `
    <button class="balao-fechar" onclick="esconderBalaoDica()">&times;</button>
    <div class="balao-titulo" style="color: ${cor}">${dica.titulo}</div>
    <div class="balao-texto">${dica.dica}</div>
  `;

    const rect = el.getBoundingClientRect();
    const formPanel = document.querySelector('.form-panel');
    const panelRect = formPanel.getBoundingClientRect();
    const isMobile = window.innerWidth <= 900;

    balao.style.display = 'block';
    balao.style.opacity = '0';
    balao.style.transform = isMobile ? 'translateY(4px)' : 'translateY(4px)';
    balao.className = isMobile ? 'ats-balao mobile' : 'ats-balao';

    const top = rect.top + window.scrollY;

    if (isMobile) {
        balao.style.left = '20px';
        balao.style.right = '20px';
        balao.style.maxWidth = 'none';
        balao.style.top = top + 'px';
        requestAnimationFrame(() => {
            balao.style.transform = 'translateY(calc(-100% - 14px))';
            balao.style.opacity = '1';
        });
    } else {
        balao.style.left = (panelRect.right + 12) + 'px';
        balao.style.right = 'auto'; // Reset right in case it was set
        balao.style.top = Math.max(80, top) + 'px';
        balao.style.maxWidth = '280px';
        balao.style.transform = 'translateY(4px)';
        requestAnimationFrame(() => {
            balao.style.transform = 'translateY(0)';
            balao.style.opacity = '1';
        });
    }
}

function esconderBalaoDica() {
    const balao = document.getElementById('ats-balao');
    if (balao) {
        balao.style.opacity = '0';
        balao.style.transform = 'translateY(4px)';
        setTimeout(() => { if (balao) balao.style.display = 'none'; }, 200);
    }
}
