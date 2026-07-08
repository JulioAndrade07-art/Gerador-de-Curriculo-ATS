import type { ResumeData } from '../types/resume';
import { ATS_AREAS, ATS_REESCRITOR } from '../data/atsData';

export interface AtsScoreResult {
    score: number;
    detalhes: {
        ok: string[];
        avisos: string[];
        criticos: string[];
    };
}

export function calcularScoreATS(
    d: ResumeData,
    areaKey?: string,
    vagaTexto?: string,
    descricaoVaga?: string
): AtsScoreResult {
    let score = 0;
    const detalhes = { ok: [] as string[], avisos: [] as string[], criticos: [] as string[] };

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
    if (d.cidade || (d.cidade_nome && d.estado_uf)) { score += 5; detalhes.ok.push('Localização informada'); }
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
    if (!d.experiencias || d.experiencias.length === 0) {
        detalhes.avisos.push('Adicione ao menos uma experiência profissional');
    } else {
        score += 10;
        const temDescricoes = d.experiencias.every(e => e.bullets && e.bullets.trim().length > 30);
        if (temDescricoes) { score += 10; detalhes.ok.push('Experiências com descrições detalhadas'); }
        else { detalhes.avisos.push('Detalhe mais as atividades de cada experiência'); }
    }

    // Formação (10pts)
    if (d.formacoes && d.formacoes.length > 0) { score += 10; detalhes.ok.push('Formação acadêmica informada'); }
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
        const textoCV = `${d.resumo} ${d.habTech} ${d.habSoft} ${(d.experiencias || []).map(e => e.bullets).join(' ')}`.toLowerCase();
        const matchedKeys = area.tecnicas.filter((k: string) => textoCV.includes(k.toLowerCase()));
        if (matchedKeys.length >= 5) { score += 5; detalhes.ok.push(`${matchedKeys.length} palavras-chave da área identificadas`); }
        else if (matchedKeys.length > 0) { detalhes.avisos.push(`Apenas ${matchedKeys.length} palavras-chave da área encontradas. Use termos como: ${area.tecnicas.slice(0, 3).join(', ')}`); }
        else { detalhes.criticos.push(`Nenhuma palavra-chave da área "${area.label}" encontrada no currículo`); }
    }

    // Análise da descrição da vaga
    if (descricaoVaga && descricaoVaga.trim().length > 20) {
        const keywords = extrairKeywordsVaga(descricaoVaga);
        const textoCV = `${d.resumo} ${d.habTech} ${d.habSoft} ${(d.experiencias || []).map(e => e.bullets).join(' ')}`.toLowerCase();
        const matched = keywords.filter(k => textoCV.includes(k.toLowerCase()));
        const coverage = Math.round((matched.length / Math.max(keywords.length, 1)) * 100);
        if (coverage >= 60) { detalhes.ok.push(`Compatibilidade com a vaga: ${coverage}%`); }
        else { detalhes.avisos.push(`Compatibilidade com a vaga: ${coverage}% — Inclua mais termos da descrição da vaga`); }
    }

    return { score: Math.min(score, 100), detalhes };
}

export function detectarAreaPorVaga(textoVaga: string): string | null {
    const t = textoVaga.toLowerCase();
    if (/estoque|almoxarif|logíst|conferente|expediç|armazenagem/i.test(t)) return 'logistica';
    if (/administrat|escritório|documentos|relatório|office|contratos/i.test(t)) return 'administracao';
    if (/atendimento|cliente|sac|suporte|recepç|call center/i.test(t)) return 'atendimento';
    if (/ti|tecnologia|desenvolv|programaç|software|sistema|analista|banco de dados/i.test(t)) return 'ti';
    if (/produç|operacional|montagem|industrial|máquina|fábrica/i.test(t)) return 'producao';
    return null;
}

export function extrairKeywordsVaga(descricao: string): string[] {
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

export function reescreverExperiencia(texto: string): string {
    let resultado = texto;
    ATS_REESCRITOR.padroes.forEach((p: { regex: RegExp; saida: string }) => {
        if (p.regex.test(resultado)) {
            resultado = resultado.replace(p.regex, p.saida);
        }
    });
    return resultado;
}
