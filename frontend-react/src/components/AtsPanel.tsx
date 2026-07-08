import { useContext, useEffect, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';
import { calcularScoreATS } from '../services/atsEngine';
import type { AtsScoreResult } from '../services/atsEngine';
import { ATS_AREAS } from '../data/atsData';

export const AtsPanel = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData } = context;

    const [scoreData, setScoreData] = useState<AtsScoreResult | null>(null);

    useEffect(() => {
        const res = calcularScoreATS(data, data.atsArea, data.atsVaga);
        setScoreData(res);
    }, [data]);

    const autoFill = () => {
        const area = ATS_AREAS[data.atsArea];
        if (!area) return;
        if (confirm(`Preencher automaticamente para ${area.label}? (Substituirá resumo e habilidades)`)) {
            updateData({
                resumo: area.resumo,
                habTech: area.tecnicas.join('\n'),
                habSoft: area.comportamentais.join('\n')
            });
        }
    };

    return (
        <>
            <div className="section-tab ats-tab" style={{ marginBottom: 0 }}>
                🎯 Otimizador ATS Inteligente
            </div>
            <div className="section-body">
                <div className="field">
                    <label>Área Profissional</label>
                    <select
                        value={data.atsArea}
                        onChange={(e) => updateData({ atsArea: e.target.value })}
                    >
                        <option value="">— Selecione sua área —</option>
                        {Object.keys(ATS_AREAS).map(k => (
                            <option key={k} value={k}>{ATS_AREAS[k].label}</option>
                        ))}
                    </select>
                </div>

                {data.atsArea && (
                    <div style={{ marginBottom: '10px' }}>
                        <button className="add-btn" style={{ background: '#1F3864', color: 'white' }} onClick={autoFill}>
                            ✨ Preencher automaticamente com conteúdo ATS
                        </button>
                    </div>
                )}

                {scoreData && (
                    <div className="ats-score-box">
                        <div className="ats-score-header">
                            <span className="ats-score-title">ATS Score</span>
                            <span className="ats-score-display">{scoreData.score}<span>/100</span></span>
                        </div>
                        <div className="ats-bar-bg">
                            <div
                                className="ats-bar-fill"
                                style={{
                                    width: `${scoreData.score}%`,
                                    background: scoreData.score >= 80 ? '#1a7a4a' : scoreData.score >= 60 ? '#d97706' : '#dc2626'
                                }}
                            />
                        </div>
                        <div className="ats-detalhes" style={{ marginTop: '10px' }}>
                            {scoreData.detalhes.criticos.map((m, i) => <div key={'c' + i} className="ats-item ats-critico">✕ {m}</div>)}
                            {scoreData.detalhes.avisos.map((m, i) => <div key={'a' + i} className="ats-item ats-aviso">⚠ {m}</div>)}
                            {scoreData.detalhes.ok.map((m, i) => <div key={'o' + i} className="ats-item ats-ok">✓ {m}</div>)}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
