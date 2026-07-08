import { useContext, useState } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const SkillsEditor = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data, updateData } = context;

    const [aberto, setAberto] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    return (
        <>
            <h3 className="section-tab" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => setAberto(!aberto)}>
                Habilidades
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
                <div className="field">
                    <label>Habilidades Técnicas (uma por linha)</label>
                    <textarea
                        name="habTech"
                        rows={5}
                        value={data.habTech}
                        onChange={handleChange}
                        placeholder="Lógica de programação&#10;Banco de dados (SQL)"
                    />
                </div>
                <div className="field">
                    <label>Habilidades Complementares (uma por linha)</label>
                    <textarea
                        name="habSoft"
                        rows={5}
                        value={data.habSoft}
                        onChange={handleChange}
                        placeholder="Organização e análise de dados&#10;Trabalho em equipe"
                    />
                </div>
            </div>
        </>
    );
};
