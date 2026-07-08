import { useContext, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const CourseEditor = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData } = context;

    const [aberto, setAberto] = useState(true);

    const addCourse = () => {
        updateData({
            cursos: [...(data.cursos || []), { id: Date.now().toString(), nome: '', instituicao: '', carga: '', status: 'Concluído' }]
        });
    };

    const removeCourse = (index: number) => {
        const newC = [...data.cursos];
        newC.splice(index, 1);
        updateData({ cursos: newC });
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newC = [...data.cursos];
        newC[index] = { ...newC[index], [field]: value };
        updateData({ cursos: newC });
    };

    return (
        <>
            <h3 className="section-tab" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => setAberto(!aberto)}>
                Cursos e Certificações
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
                {data.cursos && data.cursos.map((c, idx) => (
                    <div className="item-card" key={c.id || idx}>
                        <button className="remove-btn" onClick={() => removeCourse(idx)}>✕</button>
                        <div className="field">
                            <label>Nome do Curso</label>
                            <input value={c.nome} onChange={(e) => handleChange(idx, 'nome', e.target.value)} />
                        </div>
                        <div className="field-row">
                            <div className="field">
                                <label>Instituição</label>
                                <input value={c.instituicao} onChange={(e) => handleChange(idx, 'instituicao', e.target.value)} />
                            </div>
                            <div className="field">
                                <label>Carga Horária</label>
                                <input value={c.carga} onChange={(e) => handleChange(idx, 'carga', e.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Status</label>
                            <select value={c.status} onChange={(e) => handleChange(idx, 'status', e.target.value)}>
                                <option value="Concluído">Concluído</option>
                                <option value="Em andamento">Em andamento</option>
                            </select>
                        </div>
                    </div>
                ))}
                <button className="add-btn" onClick={addCourse}>+ Adicionar Curso</button>
            </div>
        </>
    );
};
