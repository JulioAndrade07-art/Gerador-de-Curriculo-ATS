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
import { FeedbackSupportModal } from './FeedbackSupportModal';
import { formatPhone } from '../utils/formatters';

export const FormPanel = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData, resetData } = context;

    const [showDonation, setShowDonation] = useState(false);
    const [showSupportPrompt, setShowSupportPrompt] = useState(false);
    const [dadosPessoaisAberto, setDadosPessoaisAberto] = useState(true);
    const [resumoAberto, setResumoAberto] = useState(true);
    const [estados, setEstados] = useState<{ sigla: string; nome: string }[]>([]);
    const [cidades, setCidades] = useState<string[]>([]);
    const [loadingCidades, setLoadingCidades] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        updateData({ tel: formatted });
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

    const [pendingExportType, setPendingExportType] = useState<'docx' | 'pdf' | null>(null);

    const executeExport = (type: 'docx' | 'pdf') => {
        if (type === 'docx') {
            const cvElement = document.getElementById('cv-preview');
            if (cvElement) exportToDocx(cvElement.innerHTML, data.nome || 'Curriculo');
        } else if (type === 'pdf') {
            exportToPDF('cv-preview', data.nome || 'Curriculo');
        }
    };

    const handleExportDocx = () => {
        const hide = localStorage.getItem('hide_support_prompt');
        if (hide === 'true') {
            executeExport('docx');
        } else {
            setPendingExportType('docx');
            setShowSupportPrompt(true);
        }
    };

    const handleExportPdf = () => {
        const hide = localStorage.getItem('hide_support_prompt');
        if (hide === 'true') {
            executeExport('pdf');
        } else {
            setPendingExportType('pdf');
            setShowSupportPrompt(true);
        }
    };

    const handleSupportClose = () => {
        setShowSupportPrompt(false);
        if (pendingExportType) {
            executeExport(pendingExportType);
            setPendingExportType(null);
        }
    };

    const handleSupportApprove = () => {
        setShowSupportPrompt(false);
        if (pendingExportType) {
            executeExport(pendingExportType);
            setPendingExportType(null);
        }
        setShowDonation(true);
    };

    const handleClear = () => {
        if (confirm('Deseja realmente limpar todos os dados? Esta ação não pode ser desfeita.')) resetData();
    };

    return (
        <div className="form-panel">

            {/* ===== HEADER ===== */}
            <header className="app-header">
                <div className="header-top">
                    <div className="header-brand">
                        <div className="header-icon">
                            <img src="/favicon.png" alt="Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                        </div>
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
                        🗑 Limpar Formulário
                    </button>
                </div>
            </header>

            <DonationModal isOpen={showDonation} onClose={() => setShowDonation(false)} />
            <FeedbackSupportModal
                isOpen={showSupportPrompt}
                onClose={handleSupportClose}
                onSupport={handleSupportApprove}
            />

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
                        <input
                            name="tel"
                            value={data.tel}
                            onChange={handlePhoneChange}
                            placeholder="(11) 99999-9999"
                            maxLength={15}
                        />
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

            {/* ===== SEÇÃO DE EXPORTAÇÃO NO FINAL DO FORMULÁRIO ===== */}
            <div style={{
                margin: '24px 16px 32px',
                padding: '16px',
                background: 'var(--azul-claro)',
                border: '1.5px solid var(--azul-borda)',
                borderRadius: '10px'
            }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--azul)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📥 Exportar Currículo Pronto
                </h3>
                <p style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '12px' }}>
                    Concluiu o preenchimento? Exporte seu currículo para enviar aos recrutadores:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                        className="btn btn-outline"
                        onClick={handleExportDocx}
                        style={{ padding: '10px 8px', fontSize: '12.5px', background: 'white', color: 'var(--azul)', borderColor: 'var(--azul-borda)' }}
                        title="Exportar documento editável Word"
                    >
                        📄 Exportar DOCX
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleExportPdf}
                        style={{ padding: '10px 8px', fontSize: '12.5px', background: 'var(--azul)', color: 'white' }}
                        title="Exportar PDF pronto para impressão/envio"
                    >
                        ⬇ Exportar PDF
                    </button>
                </div>
            </div>

            <button className="btn-pix-float" onClick={() => setShowDonation(true)}>
                💚 Apoiar o Projeto
            </button>
        </div>
    );
};
