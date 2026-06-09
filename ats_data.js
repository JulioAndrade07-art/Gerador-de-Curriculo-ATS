// ==================== ATS DATA BANK ====================

const ATS_AREAS = {
    logistica: {
        label: 'Logística / Almoxarifado',
        resumo: 'Profissional organizado, proativo e comprometido, com experiência em controle de estoque, conferência de mercadorias, inventários, armazenagem e rotinas logísticas. Facilidade para trabalho em equipe, resolução de problemas e utilização de sistemas ERP, mantendo foco na eficiência operacional e nos resultados.',
        tecnicas: [
            'Controle de estoque', 'Inventário', 'Recebimento de mercadorias',
            'Conferência de materiais', 'Expedição', 'Armazenagem',
            'ERP', 'Logística', 'Cadeia de suprimentos',
            'Indicadores de desempenho (KPIs)', 'Separação de pedidos',
            'Gestão de almoxarifado', 'FIFO/FEFO', 'Rastreabilidade de materiais'
        ],
        comportamentais: [
            'Organização', 'Proatividade', 'Trabalho em equipe',
            'Responsabilidade', 'Atenção aos detalhes', 'Comprometimento',
            'Gestão do tempo', 'Eficiência operacional', 'Adaptabilidade',
            'Resolução de problemas', 'Foco em resultados', 'Comunicação'
        ],
        vagas: ['Auxiliar de Almoxarifado', 'Almoxarife', 'Estoquista', 'Auxiliar de Logística', 'Operador Logístico', 'Conferente'],
        dicaCampos: {
            resumo: 'Use palavras como: controle de estoque, inventário, ERP, armazenagem, conferência de materiais. Mencione resultados ou melhorias alcançadas.',
            experiencia: 'Detalhe: quais sistemas usou (ERP, Excel), volume gerenciado, atividades diárias como recebimento, conferência, expedição.',
        }
    },
    administracao: {
        label: 'Administração / Escritório',
        resumo: 'Profissional administrativo com sólida experiência em rotinas de escritório, controle documental, emissão de relatórios, organização de processos e atendimento interno. Habilidoso no uso de ferramentas do Pacote Office e sistemas de gestão, com perfil analítico, proativo e focado em resultados.',
        tecnicas: [
            'Pacote Office (Excel, Word, PowerPoint)', 'Gestão documental',
            'Emissão de relatórios', 'Controle administrativo',
            'Gestão de processos', 'Arquivamento', 'Atendimento ao cliente',
            'CRM', 'Lançamento de dados', 'Conciliação financeira',
            'Controle de contratos', 'Gestão de agenda'
        ],
        comportamentais: [
            'Organização', 'Comunicação', 'Proatividade',
            'Discrição', 'Trabalho em equipe', 'Gestão do tempo',
            'Atenção aos detalhes', 'Responsabilidade', 'Comprometimento',
            'Adaptabilidade', 'Relacionamento interpessoal', 'Foco em resultados'
        ],
        vagas: ['Assistente Administrativo', 'Auxiliar Administrativo', 'Assistente de Escritório', 'Auxiliar de Recursos Humanos'],
        dicaCampos: {
            resumo: 'Mencione: Pacote Office, rotinas administrativas, organização de documentos, controle de processos. Agregadores como "redução de erros" ou "melhoria de processos" aumentam o score ATS.',
            experiencia: 'Liste atividades específicas: emissão de notas, controle de planilhas, atendimento telefônico, gestão de contratos.',
        }
    },
    atendimento: {
        label: 'Atendimento ao Cliente',
        resumo: 'Profissional com experiência em atendimento ao cliente presencial, telefônico e digital, com foco em satisfação, fidelização e resolução ágil de demandas. Comunicativo, empático e comprometido com a excelência no atendimento e com os resultados da equipe.',
        tecnicas: [
            'CRM', 'Atendimento ao cliente', 'Suporte técnico',
            'Pós-venda', 'Atendimento telefônico', 'Atendimento online',
            'SAC', 'Controle de chamados', 'Ferramentas de helpdesk',
            'Vendas consultivas', 'Negociação', 'Gestão de reclamações'
        ],
        comportamentais: [
            'Comunicação', 'Empatia', 'Paciência',
            'Proatividade', 'Resiliência', 'Foco no cliente',
            'Resolução de problemas', 'Trabalho em equipe', 'Comprometimento',
            'Adaptabilidade', 'Relacionamento interpessoal', 'Gestão de conflitos'
        ],
        vagas: ['Atendente', 'Assistente de Atendimento', 'Operador de SAC', 'Auxiliar de Suporte', 'Recepcionista'],
        dicaCampos: {
            resumo: 'Destaque: volume de atendimentos, satisfação do cliente (NPS), canais utilizados (telefone, chat, e-mail). Use termos como: fidelização, suporte, resolução ágil.',
            experiencia: 'Informe o canal de atendimento, volume diário, resultado (satisfação, reclamações resolvidas). Evite "atendia clientes" — seja específico.',
        }
    },
    ti: {
        label: 'Tecnologia da Informação',
        resumo: 'Profissional de TI com conhecimentos em desenvolvimento de software, suporte técnico, banco de dados e manutenção de sistemas. Perfil analítico, proativo e com facilidade de aprendizado, buscando oportunidades para aplicar habilidades técnicas em soluções que gerem impacto real.',
        tecnicas: [
            'Programação (JavaScript, Python, C, HTML/CSS)', 'Banco de Dados (SQL)',
            'Suporte técnico', 'Manutenção de redes', 'Git/GitHub',
            'Lógica de programação', 'Análise de sistemas', 'Linux',
            'Pacote Office', 'Excel avançado', 'APIs REST', 'Metodologias Ágeis'
        ],
        comportamentais: [
            'Raciocínio lógico', 'Proatividade', 'Aprendizado rápido',
            'Trabalho em equipe', 'Comunicação técnica', 'Organização',
            'Resolução de problemas', 'Adaptabilidade', 'Atenção aos detalhes',
            'Comprometimento', 'Pensamento crítico', 'Autonomia'
        ],
        vagas: ['Desenvolvedor', 'Analista de Sistemas', 'Suporte de TI', 'Programador Junior', 'Estagiário de TI'],
        dicaCampos: {
            resumo: 'Mencione as linguagens que domina, áreas de interesse, projetos pessoais ou contribuições em repositórios. Inclua o nível de formação e cursos relevantes.',
            experiencia: 'Cite de linguagens, projetos desenvolvidos, problemas resolvidos. Use métricas: "reduzi o tempo de X em Y%" ou "automatizei processo de..."',
        }
    },
    producao: {
        label: 'Produção / Operacional',
        resumo: 'Profissional com experiência em linha de produção, controle de qualidade, operação de máquinas e cumprimento de metas operacionais. Comprometido com normas de segurança, produtividade e qualidade, atuando com foco na eficiência dos processos produtivos.',
        tecnicas: [
            'Operação de máquinas', 'Controle de qualidade',
            'Processos de produção', 'Metas de produção', 'Segurança do trabalho',
            'NR-12', 'BPF (Boas Práticas de Fabricação)', 'Manutenção preventiva',
            'Análise de não conformidades', 'EPI', 'Montagem industrial'
        ],
        comportamentais: [
            'Comprometimento', 'Atenção aos detalhes', 'Responsabilidade',
            'Organização', 'Trabalho em equipe', 'Proatividade',
            'Foco em resultados', 'Disciplina', 'Gestão do tempo',
            'Adaptabilidade', 'Segurança', 'Eficiência operacional'
        ],
        vagas: ['Auxiliar de Produção', 'Operador de Produção', 'Montador', 'Auxiliar Industrial'],
        dicaCampos: {
            resumo: 'Mencione: tipo de produção, equipamentos operados, normas de segurança seguidas. Resultados como "atingia X% da meta" são valorizados.',
            experiencia: 'Informe o setor produtivo, máquinas operadas, volume produzido, certificados de segurança (NR) e cumprimento de metas.',
        }
    }
};

// Palavras-chave universais ATS
const ATS_KEYWORDS_UNIVERSAIS = [
    'Trabalho em equipe', 'Comunicação', 'Organização',
    'Proatividade', 'Resolução de problemas', 'Gestão do tempo',
    'Foco em resultados', 'Adaptabilidade', 'Eficiência operacional',
    'Planejamento', 'Melhoria contínua', 'Atendimento ao cliente',
    'Análise de dados', 'Gestão de processos', 'Relacionamento interpessoal'
];

// Dicas por campo do formulário
const ATS_DICAS_CAMPOS = {
    nome: {
        titulo: '👤 Nome Completo',
        dica: 'Use seu nome completo, sem abreviações. Evite apelidos. O nome deve ser idêntico ao do LinkedIn e documentos oficiais.',
        nivel: 'info'
    },
    resumo: {
        titulo: '📝 Resumo Profissional',
        dica: 'O resumo é lido em menos de 10s pelo recrutador. Use palavras-chave da área, mencione sua experiência e habilidades principais. Evite frases genéricas como "sou uma pessoa dedicada". Este é o campo mais importante para o ATS!',
        nivel: 'importante'
    },
    'hab-tech': {
        titulo: '🔧 Habilidades Técnicas',
        dica: 'Liste habilidades específicas: softwares (ERP, Excel, CRM), metodologias e ferramentas. Sistemas ATS buscam correspondência exata com as vagas. Seja específico!',
        nivel: 'importante'
    },
    'hab-soft': {
        titulo: '🤝 Habilidades Complementares',
        dica: 'Inclua competências comportamentais valorizadas pelo mercado: comunicação, proatividade, trabalho em equipe. Prefira termos usados nas descrições de vagas.',
        nivel: 'info'
    },
    linkedin: {
        titulo: '🔗 LinkedIn',
        dica: 'Perfis com LinkedIn têm até 40% mais chances de aprovação. Certifique-se que seu perfil está atualizado e com foto profissional.',
        nivel: 'dica'
    },
    github: {
        titulo: '💻 GitHub',
        dica: 'Para vagas de TI, um GitHub ativo com projetos relevantes pode ser decisivo. Mantenha repositórios organizados e com READMEs detalhados.',
        nivel: 'dica'
    },
    email: {
        titulo: '📧 E-mail',
        dica: 'Use um e-mail profissional, preferencialmente com seu nome. Evite apelidos ou números sem sentido. Exemplos: nome.sobrenome@gmail.com',
        nivel: 'info'
    },
    tel: {
        titulo: '📱 WhatsApp / Telefone',
        dica: 'Mantenha o número atualizado com WhatsApp ativo. Muitos recrutadores enviam mensagens antes de ligar.',
        nivel: 'info'
    }
};

// Reescritor de experiências por padrão
const ATS_REESCRITOR = {
    padroes: [
        { regex: /trabalhei no estoque/i, saida: 'Realizei controle de estoque, conferência de mercadorias, organização de materiais e apoio aos processos logísticos, contribuindo para a eficiência operacional do setor.' },
        { regex: /atendia clientes/i, saida: 'Prestei atendimento ao cliente presencial e remoto, solucionando demandas, fornecendo suporte e contribuindo para a satisfação e fidelização dos clientes.' },
        { regex: /organizava/i, saida: 'Desenvolvi rotinas de organização e controle, garantindo a padronização dos processos e a eficiência das atividades.' },
        { regex: /ajudava/i, saida: 'Apoiei as atividades do setor, contribuindo para o cumprimento das metas e a melhoria contínua dos processos.' },
        { regex: /fazia\s+relatórios?/i, saida: 'Elaborei relatórios gerenciais e operacionais, consolidando informações para subsidiar a tomada de decisão.' },
    ]
};
