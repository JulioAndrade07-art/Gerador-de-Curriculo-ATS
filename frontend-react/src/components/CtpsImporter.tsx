import React, { useContext, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const CtpsImporter = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { updateData } = context;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('pdf', file);
        try {
            const response = await fetch('/api/upload', { method: 'POST', body: formData });
            if (!response.ok) throw new Error('Falha ao processar o PDF.');
            const result = await response.json();
            if (result.success) {
                const novosDados: any = {};
                if (result.dadosPessoais?.nome) novosDados.nome = result.dadosPessoais.nome;
                if (result.dadosPessoais?.dataNascimento) {
                    const parts = result.dadosPessoais.dataNascimento.split('/');
                    if (parts.length === 3)
                        novosDados.data_nascimento = `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
                }
                if (result.contratos?.length > 0) {
                    novosDados.experiencias = result.contratos.map((c: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        cargo: c.cargo || 'Cargo não identificado',
                        empresa: c.empresa || 'Empresa não identificada',
                        periodo: `${c.admissao} - ${c.demissao || 'Atual'}`,
                        bullets: ''
                    }));
                }
                if (confirm('Dados encontrados! Deseja importar nome, data de nascimento e experiências?'))
                    updateData(novosDados);
            } else {
                throw new Error(result.error || 'Erro desconhecido ao processar PDF.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            e.target.value = '';
        }
    };

    return (
        <div className="ctps-box">
            <div className="ctps-header">
                <div className="ctps-icon">📄</div>
                <div className="ctps-label">
                    <h4>Importar da Carteira Digital</h4>
                    <p>Suba o PDF da sua CTPS para preencher nome e experiências automaticamente.</p>
                </div>
            </div>
            <div style={{ position: 'relative' }}>
                <input
                    type="file" accept=".pdf" onChange={handleFileUpload} disabled={loading}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: loading ? 'not-allowed' : 'pointer', zIndex: 2 }}
                />
                <button className="add-btn" style={{
                    margin: 0,
                    background: loading ? '#e5e7eb' : 'white',
                    borderStyle: 'solid',
                    color: loading ? 'var(--muted)' : 'var(--azul)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7
                }}>
                    {loading ? '⌛ Processando...' : '📤 Selecionar PDF da Carteira de Trabalho'}
                </button>
            </div>
            {error && (
                <div style={{ marginTop: 9, padding: '7px 10px', background: '#fee2e2', color: '#b91c1c', borderRadius: 6, fontSize: 11 }}>
                    ⚠️ {error}
                </div>
            )}
        </div>
    );
};
