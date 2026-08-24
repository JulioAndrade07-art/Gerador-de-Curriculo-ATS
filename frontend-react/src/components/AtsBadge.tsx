import { useContext, useMemo } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';
import { calcularScoreATS } from '../services/atsEngine';

export const AtsBadge = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data } = context;

    const atsResult = useMemo(() => {
        if (!data.atsArea && (!data.atsVaga || !data.atsVaga.trim())) {
            return null;
        }
        return calcularScoreATS(data, data.atsArea, data.atsVaga);
    }, [data]);

    if (!atsResult) {
        return (
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '50px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: '#64748b',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
                <span style={{ fontSize: '14px' }}>🎯</span>
                <span>Score ATS: Cole uma vaga no painel</span>
            </div>
        );
    }

    const { score } = atsResult;
    let badgeBg = '#dc2626'; // Vermelho (0-49%)
    let badgeText = 'Otimização Necessária';

    if (score >= 75) {
        badgeBg = '#1a7a4a'; // Verde (75-100%)
        badgeText = 'Excelente Otimização';
    } else if (score >= 50) {
        badgeBg = '#f59e0b'; // Amarelo (50-74%)
        badgeText = 'Otimização Média';
    }

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: badgeBg,
            color: 'white',
            borderRadius: '50px',
            fontSize: '12px',
            fontWeight: 700,
            boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <span style={{ fontSize: '14px' }}>🎯</span>
            <span>Score ATS: {score}%</span>
            <span style={{ opacity: 0.85, fontSize: '11px', fontWeight: 500 }}>({badgeText})</span>
        </div>
    );
};
