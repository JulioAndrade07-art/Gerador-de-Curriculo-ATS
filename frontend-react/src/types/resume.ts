export interface Experience {
    id: string;
    cargo: string;
    empresa: string;
    periodo: string;
    bullets: string;
}

export interface Education {
    id: string;
    curso: string;
    instituicao: string;
    periodo: string;
    status: string;
}

export interface Course {
    id: string;
    nome: string;
    instituicao: string;
    carga: string;
    status: string;
}

export interface ResumeData {
    nome: string;
    cidade: string;
    estado_uf: string;
    cidade_nome: string;
    data_nascimento: string;
    tel: string;
    cnh: string;
    email: string;
    linkedin: string;
    github: string;
    resumo: string;
    experiencias: Experience[];
    formacoes: Education[];
    cursos: Course[];
    habTech: string;
    habSoft: string;
    atsArea: string;
    atsVaga: string;
}
