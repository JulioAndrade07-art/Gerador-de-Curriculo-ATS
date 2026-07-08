import { useContext } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const PreviewPanel = () => {
    const context = useContext(ResumeContext);
    if (!context) return null;
    const { data } = context;

    const calcularIdade = (dataNasc: string) => {
        if (!dataNasc) return null;
        const hoje = new Date();
        const nasc = new Date(dataNasc);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
            idade--;
        }
        return idade;
    };

    const idade = calcularIdade(data.data_nascimento || '');

    const contatoParts = [];
    if (data.cidade_nome || data.estado_uf) {
        contatoParts.push(`${data.cidade_nome || ''}${data.cidade_nome && data.estado_uf ? ', ' : ''}${data.estado_uf || ''}, Brasil`);
    }
    if (idade !== null) contatoParts.push(`${idade} anos`);
    if (data.cnh) contatoParts.push(`CNH: ${data.cnh}`);
    if (data.tel) contatoParts.push(data.tel);
    if (data.email) contatoParts.push(data.email);

    const linksParts = [];
    if (data.linkedin) linksParts.push(`LinkedIn: ${data.linkedin}`);
    if (data.github) linksParts.push(`GitHub: ${data.github}`);

    const techList = (data.habTech || '').split('\n').filter(x => x.trim());
    const softList = (data.habSoft || '').split('\n').filter(x => x.trim());

    return (
        <div className="preview-panel">
            <div id="cv-preview">
                <div className="cv-name">{data.nome || 'SEU NOME'}</div>

                {contatoParts.length > 0 && (
                    <div className="cv-contact">{contatoParts.join('  |  ')}</div>
                )}
                {linksParts.length > 0 && (
                    <div className="cv-contact">{linksParts.join('  |  ')}</div>
                )}

                {data.resumo && (
                    <>
                        <div className="cv-section-title">Resumo Profissional</div>
                        <div className="cv-summary">{data.resumo}</div>
                    </>
                )}

                {data.experiencias && data.experiencias.length > 0 && (
                    <>
                        <div className="cv-section-title">Experiência Profissional</div>
                        {data.experiencias.map((exp, idx) => (
                            <div key={idx}>
                                <div className="cv-job-title">{exp.cargo}</div>
                                <div className="cv-job-meta">{exp.empresa} {exp.periodo ? ` | ${exp.periodo}` : ''}</div>
                                <ul>
                                    {exp.bullets.split('\n').map((bullet, i) => (
                                        bullet.trim() ? <li key={i}>{bullet}</li> : null
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}

                {data.formacoes && data.formacoes.length > 0 && (
                    <>
                        <div className="cv-section-title">Formação Acadêmica</div>
                        {data.formacoes.map((edu, idx) => (
                            <div key={idx}>
                                <div className="cv-edu-degree">{edu.curso}</div>
                                <div className="cv-edu-meta">{edu.instituicao} | {edu.periodo} ({edu.status})</div>
                            </div>
                        ))}
                    </>
                )}

                {data.cursos && data.cursos.length > 0 && (
                    <>
                        <div className="cv-section-title">Cursos e Certificações</div>
                        {data.cursos.map((c, idx) => (
                            <div key={idx}>
                                <div className="cv-edu-degree">{c.nome}</div>
                                <div className="cv-edu-meta">{c.instituicao} | {c.carga} ({c.status})</div>
                            </div>
                        ))}
                    </>
                )}

                {(techList.length > 0 || softList.length > 0) && (
                    <>
                        <div className="cv-section-title">Habilidades e Competências</div>
                        <div className="cv-skills-cols">
                            {techList.length > 0 && (
                                <div>
                                    <div className="cv-skills-label">Habilidades Técnicas</div>
                                    <ul>
                                        {techList.map((t, i) => <li key={i}>{t}</li>)}
                                    </ul>
                                </div>
                            )}
                            {softList.length > 0 && (
                                <div>
                                    <div className="cv-skills-label">Habilidades Complementares</div>
                                    <ul>
                                        {softList.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
