import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData } from '../types/resume';

interface ResumeContextType {
    data: ResumeData;
    updateData: (updates: Partial<ResumeData>) => void;
    resetData: () => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialData: ResumeData = {
    nome: 'JOÃO DA SILVA',
    cidade: 'São Paulo, SP, Brasil',
    estado_uf: 'SP',
    cidade_nome: 'São Paulo',
    data_nascimento: '1995-05-15',
    tel: '(11) 99999-9999',
    cnh: 'B',
    email: 'joao.silva@emailficticio.com',
    linkedin: 'linkedin.com/in/joaosilva-ficticio',
    github: 'github.com/joaosilva-ficticio',
    resumo: 'Profissional com mais de 5 anos de experiência administrativa.',
    experiencias: [],
    formacoes: [],
    cursos: [],
    habTech: 'Pacote Office\nSistemas ERP',
    habSoft: 'Comunicação assertiva\nTrabalho em equipe',
    atsArea: '',
    atsVaga: ''
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    // Load initial from localStorage or use default
    const [data, setData] = useState<ResumeData>(() => {
        const saved = localStorage.getItem('react_resume_data');
        if (saved) {
            try {
                return { ...initialData, ...JSON.parse(saved) };
            } catch (e) {
                return initialData;
            }
        }
        return initialData;
    });

    // Auto-Save whenever data changes
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('react_resume_data', JSON.stringify(data));
        }, 600);
        return () => clearTimeout(timer);
    }, [data]);

    const updateData = (updates: Partial<ResumeData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const resetData = () => {
        setData(initialData);
        localStorage.removeItem('react_resume_data');
    };

    return (
        <ResumeContext.Provider value={{ data, updateData, resetData }}>
            {children}
        </ResumeContext.Provider>
    );
};
