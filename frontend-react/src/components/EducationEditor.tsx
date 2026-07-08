import { useContext, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const EducationEditor = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData } = context;

    const [aberto, setAberto] = useState(true);

    const addEdu = () => {
        updateData({
            formacoes: [...(data.formacoes || []), { id: Date.now().toString(), curso: '', instituicao: '', periodo: '', status: 'Em andamento' }]
        });
    };

    const removeEdu = (index: number) => {
        const newEdu = [...data.formacoes];
        newEdu.splice(index, 1);
        updateData({ formacoes: newEdu });
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newEdu = [...data.formacoes];
        newEdu[index] = { ...newEdu[index], [field]: value };
        updateData({ formacoes: newEdu });
    };

    return (
        <>
            <h3 className="section-tab" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => setAberto(!aberto)}>
                Formação Acadêmica
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
                {data.formacoes && data.formacoes.map((edu, idx) => (
                    <div className="item-card" key={edu.id || idx}>
                        <button className="remove-btn" onClick={() => removeEdu(idx)}>✕</button>
                        <div className="field">
                            <label>Curso / Grau</label>
                            <input value={edu.curso} onChange={(e) => handleChange(idx, 'curso', e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Instituição</label>
                            <input value={edu.instituicao} onChange={(e) => handleChange(idx, 'instituicao', e.target.value)} />
                        </div>
                        <div className="field-row">
                            <div className="field">
                                <label>Período</label>
                                <input value={edu.periodo} onChange={(e) => handleChange(idx, 'periodo', e.target.value)} />
                            </div>
                            <div className="field">
                                <label>Status</label>
                                <select value={edu.status} onChange={(e) => handleChange(idx, 'status', e.target.value)}>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Curso em pausa">Curso em pausa</option>
                                    <option value="Trancado">Trancado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="add-btn" onClick={addEdu}>+ Adicionar Formação</button>
            </div>
        </>
    );
};
