import React, { useContext, useState, useEffect } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';
import { AtsPanel } from './AtsPanel';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { CourseEditor } from './CourseEditor';
import { SkillsEditor } from './SkillsEditor';
import { CtpsImporter } from './CtpsImporter';
import { exportToDocx } from '../services/docxService';
import { exportToPDF } from '../services/pdfService';
import { DonationModal } from './DonationModal';

export const FormPanel = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData, resetData } = context;

    const [showDonation, setShowDonation] = useState(false);
    const [dadosPessoaisAberto, setDadosPessoaisAberto] = useState(true);
    const [resumoAberto, setResumoAberto] = useState(true);
    const [estados, setEstados] = useState<{ sigla: string; nome: string }[]>([]);
    const [cidades, setCidades] = useState<string[]>([]);
    const [loadingCidades, setLoadingCidades] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(res => res.json())
            .then(d => setEstados(d));
    }, []);

    useEffect(() => {
        if (data.estado_uf) {
            setLoadingCidades(true);
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${data.estado_uf}/municipios`)
                .then(res => res.json())
                .then(d => { setCidades(d.map((c: any) => c.nome)); setLoadingCidades(false); });
        } else {
            setCidades([]);
        }
    }, [data.estado_uf]);

    const calcularIdade = (dataNasc: string) => {
        if (!dataNasc) return null;
        const hoje = new Date();
        const nasc = new Date(dataNasc);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
        return idade;
    };
    const idade = calcularIdade(data.data_nascimento || '');

    const handleExportDocx = () => {
        const cvElement = document.getElementById('cv-preview');
        if (cvElement) exportToDocx(cvElement.innerHTML, data.nome || 'Curriculo');
    };
    const handleExportPdf = () => exportToPDF('cv-preview', data.nome || 'Curriculo');
    const handleClear = () => {
        if (confirm('Deseja realmente limpar todos os dados? Esta ação não pode ser desfeita.')) resetData();
    };

    return (
        <div className="form-panel">

            {/* ===== HEADER ===== */}
            <header className="app-header">
                <div className="header-top">
                    <div className="header-brand">
                        <div className="header-icon">🗂</div>
                        <div className="header-text">
                            <h1>Gerador de Currículo ATS</h1>
                            <span>Preencha e exporte seu currículo profissional</span>
                        </div>
                    </div>
                    <div className="autosave-indicator">
                        <div id="save-dot" className="autosave-dot" />
                        <span id="save-label">Salvo</span>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn btn-outline" onClick={handleClear} title="Limpar tudo">
                        🗑 Limpar
                    </button>
                    <button className="btn btn-outline" onClick={handleExportDocx} title="Exportar Word">
                        📄 Exportar DOCX
                    </button>
                    <button className="btn btn-primary" onClick={handleExportPdf} title="Exportar PDF">
                        ⬇ Exportar PDF
                    </button>
                </div>
            </header>

            <DonationModal isOpen={showDonation} onClose={() => setShowDonation(false)} />

            {/* ATS + CTPS */}
            <AtsPanel />
            <CtpsImporter />

            {/* ===== DADOS PESSOAIS ===== */}
            <div className="section-tab" onClick={() => setDadosPessoaisAberto(!dadosPessoaisAberto)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                Dados Pessoais
                <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5, transition: 'transform 0.2s', transform: dadosPessoaisAberto ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>▼</span>
            </div>
            <div
                className="section-body"
                style={{
                    overflow: 'hidden',
                    maxHeight: dadosPessoaisAberto ? '2000px' : '0px',
                    opacity: dadosPessoaisAberto ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.2s ease',
                    padding: dadosPessoaisAberto ? undefined : '0 16px',
                }}
            >
                <div className="field">
                    <label>Nome Completo</label>
                    <input name="nome" value={data.nome} onChange={handleChange} placeholder="SEU NOME COMPLETO" />
                </div>
                <div className="field-row">
                    <div className="field">
                        <label>Estado (UF)</label>
                        <select name="estado_uf" value={data.estado_uf} onChange={handleChange}>
                            <option value="">Selecione...</option>
                            {estados.map(uf => <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>)}
                        </select>
                    </div>
                    <div className="field">
                        <label>Cidade</label>
                        <select name="cidade_nome" value={data.cidade_nome} onChange={handleChange} disabled={!data.estado_uf || loadingCidades}>
                            <option value="">{loadingCidades ? 'Carregando...' : 'Selecione...'}</option>
                            {cidades.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div className="field-row">
                    <div className="field">
                        <label>
                            Data de Nascimento
                            {idade !== null && <span style={{ color: 'var(--verde)', marginLeft: 5, fontWeight: 700 }}>{idade} anos</span>}
                        </label>
                        <input type="date" name="data_nascimento" value={data.data_nascimento} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Telefone / WhatsApp</label>
                        <input name="tel" value={data.tel} onChange={handleChange} placeholder="(DDD) 9 1234-5678" />
                    </div>
                </div>
                <div className="field-row">
                    <div className="field">
                        <label>E-mail</label>
                        <input name="email" value={data.email} onChange={handleChange} placeholder="email@email.com" />
                    </div>
                    <div className="field">
                        <label>CNH</label>
                        <select name="cnh" value={data.cnh} onChange={handleChange}>
                            <option value="">Não possuo</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label>LinkedIn</label>
                    <input name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="linkedin.com/in/seu-perfil" />
                </div>
                <div className="field">
                    <label>GitHub</label>
                    <input name="github" value={data.github} onChange={handleChange} placeholder="github.com/seu-perfil" />
                </div>
            </div>

            {/* ===== RESUMO ===== */}
            <div className="section-tab" onClick={() => setResumoAberto(!resumoAberto)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 10h16M4 14h10" />
                </svg>
                Resumo Profissional
                <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5, transition: 'transform 0.2s', transform: resumoAberto ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>▼</span>
            </div>
            <div
                className="section-body"
                style={{
                    overflow: 'hidden',
                    maxHeight: resumoAberto ? '2000px' : '0px',
                    opacity: resumoAberto ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.2s ease',
                    padding: resumoAberto ? undefined : '0 16px',
                }}
            >
                <div className="field">
                    <textarea name="resumo" rows={5} value={data.resumo} onChange={handleChange}
                        placeholder="Escreva seu resumo profissional com palavras-chave da área..." />
                </div>
            </div>

            <ExperienceEditor />
            <EducationEditor />
            <CourseEditor />
            <SkillsEditor />

            <button className="btn-pix-float" onClick={() => setShowDonation(true)}>
                💚 Apoiar o Projeto
            </button>
        </div>
    );
};
