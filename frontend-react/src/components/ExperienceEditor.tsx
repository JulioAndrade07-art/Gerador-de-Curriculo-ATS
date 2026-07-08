import { useContext, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const ExperienceEditor = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData } = context;

    const [aberto, setAberto] = useState(true);

    const addExp = () => {
        updateData({
            experiencias: [...(data.experiencias || []), { id: Date.now().toString(), cargo: '', empresa: '', periodo: '', bullets: '' }]
        });
    };

    const removeExp = (index: number) => {
        const newExp = [...data.experiencias];
        newExp.splice(index, 1);
        updateData({ experiencias: newExp });
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newExp = [...data.experiencias];
        newExp[index] = { ...newExp[index], [field]: value };
        updateData({ experiencias: newExp });
    };

    return (
        <>
            <h3 className="section-tab" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => setAberto(!aberto)}>
                Experiência Profissional
                <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5, transition: 'transform 0.2s', transform: aberto ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>▼</span>
            </h3>
            <div
                className="section-body"
                style={{
                    overflow: 'hidden',
                    maxHeight: aberto ? '2000px' : '0px',
                    opacity: aberto ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.2s ease',
                    padding: aberto ? undefined : '0 16px',
                }}
            >
                {data.experiencias && data.experiencias.map((exp, idx) => (
                    <div className="item-card" key={exp.id || idx}>
                        <button className="remove-btn" onClick={() => removeExp(idx)}>✕</button>
                        <div className="field-row">
                            <div className="field">
                                <label>Cargo</label>
                                <input value={exp.cargo} onChange={(e) => handleChange(idx, 'cargo', e.target.value)} />
                            </div>
                            <div className="field">
                                <label>Período</label>
                                <input value={exp.periodo} onChange={(e) => handleChange(idx, 'periodo', e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Empresa</label>
                            <input value={exp.empresa} onChange={(e) => handleChange(idx, 'empresa', e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Atividades (uma por linha)</label>
                            <textarea rows={3} value={exp.bullets} onChange={(e) => handleChange(idx, 'bullets', e.target.value)} />
                        </div>
                    </div>
                ))}
                <button className="add-btn" onClick={addExp}>+ Adicionar Experiência</button>
            </div>
        </>
    );
};
