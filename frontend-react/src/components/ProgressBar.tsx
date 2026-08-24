import { useContext, useMemo } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const ProgressBar = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data } = context;

    const percentage = useMemo(() => {
        let score = 0;
        if (data.nome && data.nome.trim()) score += 15;
        if (data.tel && data.tel.trim()) score += 10;
        if (data.email && data.email.trim()) score += 10;
        if ((data.cidade_nome && data.cidade_nome.trim()) || (data.estado_uf && data.estado_uf.trim())) score += 10;
        if (data.resumo && data.resumo.trim()) score += 15;
        if (data.experiencias && data.experiencias.some(e => e.cargo && e.cargo.trim())) score += 15;
        if (data.formacoes && data.formacoes.some(f => f.curso && f.curso.trim())) score += 15;
        if ((data.habTech && data.habTech.trim()) || (data.habSoft && data.habSoft.trim())) score += 10;
        return Math.min(100, score);
    }, [data]);

    return (
        <div style={{
            padding: '9px 18px',
            background: 'var(--azul-claro)',
            borderBottom: '1px solid var(--azul-borda)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11.5px', fontWeight: 600, color: 'var(--azul)' }}>
                    <span>Progresso do Currículo</span>
                    <span>{percentage}% preenchido</span>
                </div>
                <div style={{ height: '7px', background: '#dce6f5', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: 'linear-gradient(90deg, #1F3864 0%, #2a4a8a 100%)',
                        borderRadius: '4px',
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                </div>
            </div>
        </div>
    );
};
