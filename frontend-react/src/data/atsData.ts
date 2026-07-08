export interface AtsArea {
    label: string;
    resumo: string;
    tecnicas: string[];
    comportamentais: string[];
    vagas: string[];
    dicaCampos: {
        resumo: string;
        experiencia: string;
    };
}

export const ATS_AREAS: Record<string, AtsArea> = {
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
            experiencia: 'Cite linguagens, projetos desenvolvidos, problemas resolvidos. Use métricas: "reduzi o tempo de X em Y%" ou "automatizei processo de..."',
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
    comercial: {
        label: 'Comercial / Vendas',
        resumo: 'Profissional de vendas com experiência em prospecção de clientes, negociação, fechamento de contratos e pós-venda. Orientado a metas, com habilidade de relacionamento e conhecimento em técnicas de vendas consultivas, CRM e estratégias comerciais para expansão de carteira.',
        tecnicas: [
            'Técnicas de vendas', 'CRM', 'Prospecção de clientes',
            'Negociação', 'Fechamento de vendas', 'Pós-venda',
            'Funil de vendas', 'Vendas consultivas', 'Metas comerciais',
            'Gestão de carteira', 'Apresentações comerciais', 'Precificação'
        ],
        comportamentais: [
            'Comunicação', 'Persuasão', 'Resiliência',
            'Foco em resultados', 'Proatividade', 'Empatia',
            'Relacionamento interpessoal', 'Organização', 'Trabalho em equipe',
            'Adaptabilidade', 'Comprometimento', 'Orientação a metas'
        ],
        vagas: ['Vendedor', 'Representante Comercial', 'Consultor de Vendas', 'Assistente Comercial', 'Promotor de Vendas'],
        dicaCampos: {
            resumo: 'Inclua: metas atingidas, percentual de crescimento, volume de vendas. Termos como "expansão de carteira", "prospecção ativa" e "fidelização" são valorizados.',
            experiencia: 'Informe o produto/serviço vendido, metas mensais, percentual de atingimento, técnicas utilizadas e resultados concretos.',
        }
    },
    marketing: {
        label: 'Marketing e Comunicação',
        resumo: 'Profissional de marketing com experiência em criação de conteúdo, gestão de redes sociais, campanhas digitais e análise de métricas. Criativo, analítico e atualizado com as tendências do mercado digital, com foco em geração de resultados e fortalecimento de marca.',
        tecnicas: [
            'Marketing digital', 'Gestão de redes sociais', 'SEO',
            'Google Ads', 'Meta Ads', 'Criação de conteúdo',
            'Copywriting', 'E-mail marketing', 'Google Analytics',
            'Canva', 'Edição de imagem/vídeo', 'Inbound Marketing',
            'Branding', 'CRM'
        ],
        comportamentais: [
            'Criatividade', 'Comunicação', 'Organização',
            'Proatividade', 'Pensamento analítico', 'Adaptabilidade',
            'Trabalho em equipe', 'Gestão do tempo', 'Foco em resultados',
            'Curiosidade', 'Atenção aos detalhes', 'Inovação'
        ],
        vagas: ['Analista de Marketing', 'Assistente de Marketing', 'Social Media', 'Produtor de Conteúdo', 'Designer Gráfico'],
        dicaCampos: {
            resumo: 'Mencione: canais gerenciados, crescimento de seguidores, ROI de campanhas. Use termos como: engajamento, conversão, tráfego orgânico, leads gerados.',
            experiencia: 'Cite campanhas criadas, resultados obtidos (aumento de X% em seguidores, leads gerados, ROI), ferramentas utilizadas.',
        }
    },
    rh: {
        label: 'Recursos Humanos',
        resumo: 'Profissional de Recursos Humanos com experiência em recrutamento e seleção, admissão, treinamento, controle de ponto e rotinas de departamento pessoal. Organizado, comunicativo e comprometido com a gestão de pessoas e o desenvolvimento organizacional.',
        tecnicas: [
            'Recrutamento e Seleção', 'Departamento Pessoal', 'Folha de Pagamento',
            'eSocial', 'Admissão e Demissão', 'Controle de ponto',
            'CAGED', 'Treinamento e Desenvolvimento', 'Avaliação de desempenho',
            'Legislação trabalhista (CLT)', 'RAIS', 'Benefícios'
        ],
        comportamentais: [
            'Comunicação', 'Discrição', 'Empatia',
            'Organização', 'Relacionamento interpessoal', 'Proatividade',
            'Ética profissional', 'Trabalho em equipe', 'Resolução de conflitos',
            'Comprometimento', 'Gestão do tempo', 'Adaptabilidade'
        ],
        vagas: ['Assistente de RH', 'Auxiliar de Departamento Pessoal', 'Recrutador', 'Analista de RH', 'Assistente de DP'],
        dicaCampos: {
            resumo: 'Mencione: subsistemas de RH dominados (R&S, DP, T&D), sistemas utilizados (Senior, TOTVS, Ahgora), volume de colaboradores atendidos.',
            experiencia: 'Informe os processos realizados: triagem de currículos, entrevistas, admissões, folha de pagamento, volume de funcionários gerenciados.',
        }
    },
    financeiro: {
        label: 'Financeiro / Contabilidade',
        resumo: 'Profissional da área financeira com experiência em contas a pagar e receber, conciliação bancária, fluxo de caixa, emissão de notas fiscais e lançamentos contábeis. Analítico, organizado e comprometido com a acurácia das informações e o cumprimento de prazos.',
        tecnicas: [
            'Contas a pagar e receber', 'Conciliação bancária', 'Fluxo de caixa',
            'Emissão de notas fiscais (NF-e)', 'Lançamentos contábeis',
            'Excel avançado', 'ERP Financeiro', 'Impostos (ICMS, PIS, COFINS)',
            'DRE', 'Balanço patrimonial', 'Controle orçamentário', 'SPED'
        ],
        comportamentais: [
            'Atenção aos detalhes', 'Organização', 'Responsabilidade',
            'Ética profissional', 'Raciocínio analítico', 'Proatividade',
            'Gestão do tempo', 'Comprometimento', 'Trabalho sob pressão',
            'Discrição', 'Foco em resultados', 'Comunicação'
        ],
        vagas: ['Assistente Financeiro', 'Auxiliar de Contabilidade', 'Assistente Contábil', 'Analista Financeiro', 'Auxiliar Financeiro'],
        dicaCampos: {
            resumo: 'Use termos como: conciliação bancária, fluxo de caixa, contas a pagar/receber, ERP. Mencione sistemas utilizados (SAP, TOTVS, Omie) e volume financeiro gerenciado.',
            experiencia: 'Detalhe: volume de lançamentos, tipos de contas gerenciadas, relatórios produzidos, sistemas financeiros utilizados.',
        }
    },
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
    compras: {
        label: 'Compras / Suprimentos',
        resumo: 'Profissional de compras com experiência em cotação de preços, negociação com fornecedores, gestão de pedidos e controle de suprimentos. Analítico e orientado à redução de custos, com foco em qualidade, prazo de entrega e manutenção de relacionamentos comerciais estratégicos.',
        tecnicas: [
            'Cotação de preços', 'Negociação com fornecedores', 'Gestão de pedidos',
            'Controle de suprimentos', 'Análise de propostas', 'ERP',
            'Homologação de fornecedores', 'Gestão de contratos', 'Compras diretas e indiretas',
            'Indicadores de compras (KPIs)', 'Excel avançado', 'Redução de custos'
        ],
        comportamentais: [
            'Negociação', 'Organização', 'Atenção aos detalhes',
            'Proatividade', 'Raciocínio analítico', 'Comunicação',
            'Ética profissional', 'Foco em resultados', 'Trabalho em equipe',
            'Comprometimento', 'Gestão do tempo', 'Relacionamento interpessoal'
        ],
        vagas: ['Assistente de Compras', 'Auxiliar de Suprimentos', 'Analista de Compras', 'Comprador', 'Assistente de Procurement'],
        dicaCampos: {
            resumo: 'Mencione: redução de custos obtida, volume de pedidos gerenciados, número de fornecedores. Termos como "homologação", "cotação" e "negociação" são essenciais.',
            experiencia: 'Informe: categoria de materiais comprados, volume financeiro, economia gerada, sistemas utilizados (ERP, SAP).',
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
    },
    engenharia: {
        label: 'Engenharia',
        resumo: 'Engenheiro com experiência em projetos técnicos, gestão de obras ou processos industriais, elaboração de laudos e acompanhamento de execução. Comprometido com qualidade, prazo e conformidade técnica, com habilidade para liderança de equipes e resolução de problemas complexos.',
        tecnicas: [
            'AutoCAD', 'Projetos técnicos', 'Gestão de projetos',
            'Normas ABNT', 'Análise de viabilidade', 'Orçamento de obras',
            'Gestão de equipes', 'Controle de qualidade', 'MS Project',
            'BIM (Revit)', 'Elaboração de laudos', 'PMBOK'
        ],
        comportamentais: [
            'Liderança', 'Raciocínio analítico', 'Organização',
            'Comunicação técnica', 'Resolução de problemas', 'Proatividade',
            'Trabalho em equipe', 'Atenção aos detalhes', 'Gestão do tempo',
            'Tomada de decisão', 'Comprometimento', 'Inovação'
        ],
        vagas: ['Engenheiro Junior', 'Analista de Engenharia', 'Assistente de Projetos', 'Técnico de Engenharia', 'Projetista'],
        dicaCampos: {
            resumo: 'Mencione a especialidade (civil, mecânica, elétrica, produção), projetos relevantes, softwares dominados e resultados entregues.',
            experiencia: 'Cite projetos executados, equipe gerenciada, prazo e orçamento cumpridos, softwares utilizados (AutoCAD, Revit, MS Project).',
        }
    },
    construcao: {
        label: 'Construção Civil',
        resumo: 'Profissional da construção civil com experiência em execução de obras, acompanhamento de serviços, controle de materiais e cumprimento de normas de segurança. Comprometido com prazos, qualidade e segurança no trabalho, atuando com equipes multidisciplinares em diferentes etapas da construção.',
        tecnicas: [
            'Execução de obras', 'Leitura de projetos', 'Alvenaria',
            'Controle de materiais', 'Normas de segurança (NR-18)', 'Cronograma de obras',
            'Serviços de acabamento', 'Instalações hidráulicas e elétricas básicas',
            'Orçamento de obra', 'AutoCAD básico', 'EPI', 'Gestão de resíduos'
        ],
        comportamentais: [
            'Responsabilidade', 'Trabalho em equipe', 'Organização',
            'Atenção aos detalhes', 'Comprometimento', 'Proatividade',
            'Disciplina', 'Resistência física', 'Adaptabilidade',
            'Liderança de equipe', 'Foco em resultados', 'Segurança'
        ],
        vagas: ['Auxiliar de Obras', 'Pedreiro', 'Mestre de Obras', 'Encarregado de Obras', 'Servente de Obras'],
        dicaCampos: {
            resumo: 'Mencione: tipo de obra (residencial, comercial, industrial), funções exercidas, NRs conhecidas. Cite o número de obras ou projetos participados.',
            experiencia: 'Informe o tipo de serviço executado, tamanho da equipe liderada (se aplicável), tipos de obra e normas seguidas.',
        }
    },
    manutencao: {
        label: 'Manutenção Industrial',
        resumo: 'Profissional de manutenção com experiência em manutenção preventiva, corretiva e preditiva de máquinas e equipamentos industriais. Comprometido com a disponibilidade dos equipamentos, segurança operacional e redução de paradas não programadas, com conhecimento em normas de segurança do trabalho.',
        tecnicas: [
            'Manutenção preventiva', 'Manutenção corretiva', 'Manutenção preditiva',
            'Leitura de esquemas elétricos', 'Instrumentação', 'Pneumática',
            'Hidráulica', 'NR-10', 'NR-12', 'NR-13',
            'Ordem de serviço (OS)', 'CMMS (sistema de manutenção)'
        ],
        comportamentais: [
            'Atenção aos detalhes', 'Responsabilidade', 'Proatividade',
            'Raciocínio técnico', 'Trabalho em equipe', 'Organização',
            'Comprometimento', 'Resolução de problemas', 'Segurança',
            'Disciplina', 'Adaptabilidade', 'Foco em resultados'
        ],
        vagas: ['Auxiliar de Manutenção', 'Mecânico de Manutenção', 'Eletricista de Manutenção', 'Técnico de Manutenção', 'Encarregado de Manutenção'],
        dicaCampos: {
            resumo: 'Mencione: tipo de manutenção (preventiva/corretiva/preditiva), equipamentos mantidos, NRs conhecidas. Reduções de parada ou aumento de disponibilidade são diferenciais.',
            experiencia: 'Informe equipamentos mantidos, tipo de manutenção realizada, NRs aplicadas, sistemas de OS utilizados.',
        }
    },
    mecanica: {
        label: 'Mecânica',
        resumo: 'Profissional mecânico com experiência em montagem, ajuste e reparo de peças, componentes e sistemas mecânicos. Habilidoso no uso de ferramentas de medição, leitura de desenhos técnicos e cumprimento de normas de segurança, com foco na qualidade e precisão dos serviços executados.',
        tecnicas: [
            'Montagem mecânica', 'Ajuste e torneamento', 'Leitura de desenho técnico',
            'Instrumentos de medição (paquímetro, micrômetro)', 'Fresagem', 'Soldagem básica',
            'Hidráulica e pneumática', 'Lubrificação', 'NR-12',
            'Manutenção de redutores', 'Alinhamento de eixos', 'Rolamentos'
        ],
        comportamentais: [
            'Atenção aos detalhes', 'Precisão', 'Responsabilidade',
            'Proatividade', 'Trabalho em equipe', 'Organização',
            'Comprometimento', 'Raciocínio técnico', 'Segurança',
            'Disciplina', 'Foco em resultados', 'Adaptabilidade'
        ],
        vagas: ['Mecânico Industrial', 'Auxiliar de Mecânica', 'Torneiro Mecânico', 'Mecânico de Manutenção', 'Montador Mecânico'],
        dicaCampos: {
            resumo: 'Cite especialidade (torneiro, montador, manutenção), equipamentos trabalhados, ferramentas dominadas e normas de segurança seguidas.',
            experiencia: 'Informe o tipo de serviço mecânico realizado, máquinas e ferramentas utilizadas, NRs aplicadas.',
        }
    },
    eletrica: {
        label: 'Elétrica / Eletrônica',
        resumo: 'Profissional da área elétrica com experiência em instalações elétricas prediais e industriais, manutenção de painéis, leitura de esquemas e normas de segurança. Comprometido com a qualidade dos serviços e a segurança operacional, com conhecimento nas NRs aplicáveis à área.',
        tecnicas: [
            'Instalações elétricas prediais', 'Instalações elétricas industriais',
            'Leitura de esquemas elétricos', 'Manutenção de painéis elétricos',
            'NR-10', 'NR-12', 'Aterramento', 'Instrumentação',
            'CLP (Controlador Lógico Programável)', 'Inversores de frequência',
            'Multímetro e alicate amperímetro', 'SPDA'
        ],
        comportamentais: [
            'Atenção aos detalhes', 'Responsabilidade', 'Segurança',
            'Proatividade', 'Raciocínio técnico', 'Trabalho em equipe',
            'Organização', 'Comprometimento', 'Resolução de problemas',
            'Disciplina', 'Adaptabilidade', 'Foco em resultados'
        ],
        vagas: ['Eletricista Industrial', 'Eletricista Predial', 'Auxiliar Eletricista', 'Técnico Eletricista', 'Eletrotécnico'],
        dicaCampos: {
            resumo: 'Mencione especialidade (predial/industrial), NR-10 (obrigatória), equipamentos trabalhados. Habilitações e certificações têm peso alto no ATS.',
            experiencia: 'Informe o tipo de instalação, tensão trabalhada, certificações NR-10, equipamentos e sistemas elétricos mantidos.',
        }
    },
    automacao: {
        label: 'Automação Industrial',
        resumo: 'Profissional de automação com experiência em programação de CLPs, instrumentação, sistemas SCADA e manutenção de equipamentos automatizados. Analítico, com raciocínio técnico apurado e comprometido com a melhoria contínua dos processos industriais e a redução de falhas operacionais.',
        tecnicas: [
            'CLP (Siemens, Allen Bradley, Schneider)', 'SCADA', 'Instrumentação',
            'Inversores de frequência', 'Redes industriais (Profibus, Modbus)',
            'Pneumática e hidráulica', 'Sensores e atuadores', 'IHM',
            'NR-10', 'NR-12', 'CAD Elétrico', 'Python para automação'
        ],
        comportamentais: [
            'Raciocínio analítico', 'Atenção aos detalhes', 'Proatividade',
            'Resolução de problemas', 'Trabalho em equipe', 'Organização',
            'Comprometimento', 'Aprendizado contínuo', 'Segurança',
            'Comunicação técnica', 'Foco em resultados', 'Inovação'
        ],
        vagas: ['Técnico de Automação', 'Programador de CLP', 'Analista de Automação', 'Instrumentista', 'Técnico de Instrumentação'],
        dicaCampos: {
            resumo: 'Mencione: marcas de CLP dominadas (Siemens S7, Allen Bradley), projetos de automação, redes industriais e resultados obtidos (redução de paradas, ganho de eficiência).',
            experiencia: 'Cite os sistemas programados, projetos implantados, redes industriais utilizadas e impactos gerados.',
        }
    },
    qualidade: {
        label: 'Qualidade',
        resumo: 'Profissional da área de qualidade com experiência em auditorias internas, controle de processos, análise de não conformidades, elaboração de documentos e implantação de normas ISO. Comprometido com a melhoria contínua, padronização e conformidade dos processos produtivos e administrativos.',
        tecnicas: [
            'ISO 9001', 'Auditorias internas', 'Controle de não conformidades',
            'FMEA', 'CEP (Controle Estatístico de Processo)', 'BPF',
            'Ferramentas da qualidade (Ishikawa, 5W2H, PDCA)', '5S',
            'Análise de causa raiz', 'Calibração de instrumentos', 'Documentação da qualidade'
        ],
        comportamentais: [
            'Atenção aos detalhes', 'Organização', 'Raciocínio analítico',
            'Comprometimento', 'Proatividade', 'Comunicação',
            'Trabalho em equipe', 'Ética profissional', 'Foco em resultados',
            'Disciplina', 'Melhoria contínua', 'Resolução de problemas'
        ],
        vagas: ['Analista de Qualidade', 'Inspetor de Qualidade', 'Auxiliar de Qualidade', 'Técnico de Qualidade', 'Auditor Interno'],
        dicaCampos: {
            resumo: 'Mencione normas dominadas (ISO 9001, BPF), ferramentas utilizadas (PDCA, FMEA, 5S), auditorias realizadas e resultados de melhoria.',
            experiencia: 'Cite as ferramentas aplicadas, não conformidades tratadas, auditorias conduzidas e melhorias implantadas.',
        }
    },
    saude: {
        label: 'Saúde',
        resumo: 'Profissional da área da saúde comprometido com a excelência no atendimento ao paciente, seguindo protocolos clínicos, normas de biossegurança e ética profissional. Com experiência em ambiente hospitalar, clínico ou ambulatorial, buscando contribuir para a qualidade da assistência e o bem-estar dos pacientes.',
        tecnicas: [
            'Atendimento ao paciente', 'Biossegurança', 'Protocolos clínicos',
            'Prontuário eletrônico', 'Sinais vitais', 'Administração de medicamentos',
            'Curativos e procedimentos', 'Hemoterapia', 'ANVISA',
            'Higienização hospitalar', 'Controle de infecção hospitalar', 'Triagem'
        ],
        comportamentais: [
            'Empatia', 'Comunicação', 'Ética profissional',
            'Responsabilidade', 'Trabalho em equipe', 'Atenção aos detalhes',
            'Resiliência', 'Comprometimento', 'Organização',
            'Humanização no atendimento', 'Proatividade', 'Gestão do tempo'
        ],
        vagas: ['Técnico de Enfermagem', 'Auxiliar de Enfermagem', 'Recepcionista de Clínica', 'Agente de Saúde', 'Auxiliar de Farmácia'],
        dicaCampos: {
            resumo: 'Mencione: tipo de unidade (hospital, UPA, clínica), especialidade, procedimentos realizados, registro profissional (COREN, CRM). Biossegurança é palavra-chave crítica.',
            experiencia: 'Informe o setor de atuação, procedimentos realizados, equipamentos utilizados, volume de pacientes atendidos.',
        }
    },
    farmacia: {
        label: 'Farmácia',
        resumo: 'Profissional farmacêutico ou auxiliar com experiência em dispensação de medicamentos, controle de estoque farmacêutico, atendimento ao cliente e cumprimento das normas da ANVISA e CFF. Comprometido com a segurança do paciente, a qualidade dos serviços e a orientação farmacêutica responsável.',
        tecnicas: [
            'Dispensação de medicamentos', 'Controle de psicotrópicos', 'Farmácia hospitalar',
            'Farmacotécnica', 'SNGPC', 'ANVISA', 'Controle de estoque farmacêutico',
            'Fracionamento de medicamentos', 'Atenção farmacêutica', 'RDC 44',
            'Manipulação farmacêutica', 'Gestão de validades'
        ],
        comportamentais: [
            'Atenção aos detalhes', 'Responsabilidade', 'Ética profissional',
            'Organização', 'Comunicação', 'Empatia',
            'Comprometimento', 'Proatividade', 'Trabalho em equipe',
            'Discrição', 'Foco no cliente', 'Raciocínio clínico'
        ],
        vagas: ['Auxiliar de Farmácia', 'Balconista de Farmácia', 'Farmacêutico', 'Técnico em Farmácia', 'Assistente de Farmácia'],
        dicaCampos: {
            resumo: 'Mencione: CRF (se possuir), tipo de farmácia (hospitalar, comunitária, manipulação), controle de psicotrópicos, SNGPC e ANVISA.',
            experiencia: 'Informe o tipo de farmácia, volume de vendas, controle de psicotrópicos, sistemas utilizados e normas seguidas.',
        }
    },
    educacao: {
        label: 'Educação',
        resumo: 'Profissional da educação comprometido com o desenvolvimento dos alunos, elaboração de planos de aula, aplicação de metodologias ativas e acompanhamento pedagógico. Com experiência em gestão de sala de aula, produção de material didático e comunicação efetiva com alunos, famílias e equipe pedagógica.',
        tecnicas: [
            'Planejamento pedagógico', 'Elaboração de planos de aula', 'BNCC',
            'Metodologias ativas', 'Avaliação formativa', 'Gestão de sala de aula',
            'Ferramentas digitais educacionais', 'Google Classroom', 'Moodle',
            'Libras básico', 'Inclusão educacional', 'Relatórios pedagógicos'
        ],
        comportamentais: [
            'Comunicação', 'Empatia', 'Criatividade',
            'Paciência', 'Organização', 'Liderança',
            'Comprometimento', 'Adaptabilidade', 'Trabalho em equipe',
            'Proatividade', 'Escuta ativa', 'Resolução de conflitos'
        ],
        vagas: ['Professor', 'Auxiliar de Sala', 'Monitor Educacional', 'Instrutor', 'Coordenador Pedagógico'],
        dicaCampos: {
            resumo: 'Mencione: disciplina ou área de atuação, faixa etária dos alunos, metodologias utilizadas, resultados (aprovação, engajamento, melhoria de desempenho).',
            experiencia: 'Informe a disciplina, nível de ensino, número de alunos, metodologias aplicadas e ferramentas utilizadas.',
        }
    },
    juridico: {
        label: 'Jurídico',
        resumo: 'Profissional jurídico com experiência em elaboração de petições, contratos, acompanhamento processual e suporte às rotinas do departamento jurídico. Organizado, analítico e comprometido com o cumprimento de prazos, a conformidade legal e a assessoria jurídica de qualidade.',
        tecnicas: [
            'Elaboração de petições', 'Contratos', 'Acompanhamento processual',
            'Pesquisa jurisprudencial', 'Sistemas de processo eletrônico (PJe, e-SAJ)',
            'Direito trabalhista', 'Direito civil', 'Direito empresarial',
            'Conciliação', 'Protocolo de documentos', 'Diligências', 'OAB'
        ],
        comportamentais: [
            'Atenção aos detalhes', 'Organização', 'Discrição',
            'Raciocínio analítico', 'Comunicação escrita', 'Responsabilidade',
            'Ética profissional', 'Gestão do tempo', 'Proatividade',
            'Comprometimento', 'Trabalho em equipe', 'Resolução de problemas'
        ],
        vagas: ['Assistente Jurídico', 'Estagiário de Direito', 'Advogado Junior', 'Auxiliar Jurídico', 'Analista Jurídico'],
        dicaCampos: {
            resumo: 'Mencione: área de atuação (trabalhista, civil, empresarial), sistemas processuais dominados (PJe), OAB (se possuir), volume de processos gerenciados.',
            experiencia: 'Informe a área jurídica de atuação, tipo de peças elaboradas, sistemas utilizados e volume de processos acompanhados.',
        }
    },
    segurancatrabalho: {
        label: 'Segurança do Trabalho',
        resumo: 'Técnico ou profissional de Segurança do Trabalho com experiência em elaboração de PPRA, PCMSO, DDS, treinamentos de NR e inspeções de campo. Comprometido com a prevenção de acidentes, conformidade com as normas regulamentadoras e promoção da cultura de segurança no ambiente de trabalho.',
        tecnicas: [
            'NRs (NR-1 ao NR-35)', 'PPRA / PGR', 'PCMSO',
            'Análise de Risco (APR/ART)', 'DDS (Diálogo Diário de Segurança)',
            'CAT (Comunicação de Acidente)', 'CIPA', 'Treinamentos de segurança',
            'EPI / EPC', 'Inspeções de campo', 'Investigação de acidentes', 'eSocial SST'
        ],
        comportamentais: [
            'Liderança', 'Comunicação', 'Proatividade',
            'Responsabilidade', 'Atenção aos detalhes', 'Comprometimento',
            'Trabalho em equipe', 'Ética profissional', 'Organização',
            'Resolução de problemas', 'Adaptabilidade', 'Persuasão'
        ],
        vagas: ['Técnico de Segurança do Trabalho', 'Assistente de SST', 'Coordenador de SSMA', 'Analista de Segurança', 'Estagiário de Segurança do Trabalho'],
        dicaCampos: {
            resumo: 'Mencione: NRs dominadas, documentos elaborados (PPRA, PCMSO, PGR), eSocial SST, treinamentos ministrados, registro no MTE.',
            experiencia: 'Informe o setor de atuação, NRs aplicadas, documentos produzidos, acidentes investigados e treinamentos realizados.',
        }
    },
    segurancapatrimonial: {
        label: 'Segurança Patrimonial',
        resumo: 'Profissional de segurança patrimonial com experiência em controle de acesso, monitoramento de câmeras, ronda patrimonial, prevenção de perdas e atendimento a ocorrências. Comprometido com a proteção das pessoas e do patrimônio, seguindo normas de conduta, postura profissional e legislação vigente.',
        tecnicas: [
            'Controle de acesso', 'Monitoramento por câmeras (CFTV)', 'Ronda patrimonial',
            'Prevenção de perdas', 'Registro de ocorrências', 'Portaria e recepção',
            'Curso de Vigilante (SENASP)', 'NR-35', 'Primeiros socorros básicos',
            'Relatórios de segurança', 'Rádio comunicador', 'Legislação de segurança privada'
        ],
        comportamentais: [
            'Responsabilidade', 'Discrição', 'Atenção',
            'Comprometimento', 'Postura profissional', 'Comunicação',
            'Trabalho em equipe', 'Resiliência', 'Proatividade',
            'Ética', 'Organização', 'Serenidade'
        ],
        vagas: ['Vigilante', 'Porteiro', 'Segurança Patrimonial', 'Monitor de Segurança', 'Auxiliar de Prevenção de Perdas'],
        dicaCampos: {
            resumo: 'Mencione: curso de vigilante, porte de arma (se aplicável), tipo de instalação (banco, shopping, empresa), sistemas de monitoramento utilizados.',
            experiencia: 'Informe o tipo de local monitorado, sistemas utilizados (CFTV, controle de acesso), ocorrências registradas, curso de formação.',
        }
    },
    transporte: {
        label: 'Transporte / Motorista',
        resumo: 'Motorista profissional com experiência em transporte de cargas ou passageiros, cumprimento de rotas, manutenção preventiva de veículos e conformidade com a legislação de trânsito. Comprometido com a segurança, pontualidade e excelência na entrega, com ótimo relacionamento com clientes e equipes.',
        tecnicas: [
            'CNH (A, B, C, D, E)', 'Direção defensiva', 'Transporte de cargas',
            'Transporte de passageiros', 'Roteirização', 'Conhecimento de rotas',
            'Vistoria de veículos', 'Manutenção preventiva básica', 'Código de Trânsito Brasileiro',
            'Documentação de veículos', 'EAD Condutores', 'Logística de entregas'
        ],
        comportamentais: [
            'Responsabilidade', 'Pontualidade', 'Atenção',
            'Comprometimento', 'Organização', 'Comunicação',
            'Proatividade', 'Disciplina', 'Respeito às normas',
            'Foco no cliente', 'Adaptabilidade', 'Trabalho em equipe'
        ],
        vagas: ['Motorista de Caminhão', 'Motorista Entregador', 'Motorista de Van', 'Operador de Empilhadeira', 'Auxiliar de Entrega'],
        dicaCampos: {
            resumo: 'Mencione: categoria da CNH, tipo de veículo dirigido (carga, passeio, ônibus), anos de experiência, cursos (direção defensiva, MOPP se aplicável).',
            experiencia: 'Informe o tipo de veículo, carga transportada, rotas percorridas, cursos complementares e histórico sem infrações.',
        }
    },
    hotelaria: {
        label: 'Hotelaria e Turismo',
        resumo: 'Profissional de hotelaria e turismo com experiência em recepção, reservas, atendimento ao hóspede e gestão de eventos. Comunicativo, organizado e comprometido com a experiência do cliente, com conhecimento em sistemas hoteleiros, idiomas e padrões internacionais de hospitalidade.',
        tecnicas: [
            'Recepção hoteleira', 'Sistema de reservas (PMS)', 'Check-in e check-out',
            'Atendimento ao hóspede', 'Gestão de eventos', 'Idiomas (Inglês, Espanhol)',
            'Camareira / Governança', 'F&B (Alimentos e Bebidas)', 'OTAs (Booking, Airbnb)',
            'Revenue Management', 'Pacote Office', 'Atendimento VIP'
        ],
        comportamentais: [
            'Comunicação', 'Empatia', 'Organização',
            'Proatividade', 'Apresentação pessoal', 'Trabalho em equipe',
            'Foco no cliente', 'Discrição', 'Adaptabilidade',
            'Resiliência', 'Comprometimento', 'Relacionamento interpessoal'
        ],
        vagas: ['Recepcionista de Hotel', 'Camareira', 'Garçom', 'Auxiliar de Camareira', 'Assistente de Reservas'],
        dicaCampos: {
            resumo: 'Mencione: idiomas (nível de proficiência), sistemas hoteleiros (Opera, Totvs Hoteleiro), tipo de hotel (econômico, luxo), certificações em hospitalidade.',
            experiencia: 'Informe o tipo de estabelecimento, volume de hóspedes, idiomas utilizados no trabalho, sistemas de reserva utilizados.',
        }
    },
    gastronomia: {
        label: 'Gastronomia',
        resumo: 'Profissional de gastronomia com experiência em preparo de alimentos, técnicas culinárias, boas práticas de fabricação e gestão de cozinha. Criativo, organizado e comprometido com a qualidade, apresentação dos pratos e segurança alimentar, seguindo os padrões da ANVISA e normas sanitárias.',
        tecnicas: [
            'Técnicas culinárias', 'BPF (Boas Práticas de Fabricação)', 'APPCC',
            'Higiene e manipulação de alimentos', 'Controle de custos (food cost)',
            'Gestão de cozinha', 'Operação de equipamentos', 'Cardápio (menu)',
            'Vigilância sanitária', 'Estoque de alimentos', 'Cozinha fria e quente', 'Confeitaria'
        ],
        comportamentais: [
            'Criatividade', 'Organização', 'Trabalho em equipe',
            'Atenção aos detalhes', 'Proatividade', 'Comprometimento',
            'Resiliência', 'Agilidade', 'Disciplina',
            'Higiene pessoal', 'Foco em resultados', 'Adaptabilidade'
        ],
        vagas: ['Auxiliar de Cozinha', 'Cozinheiro', 'Confeiteiro', 'Assistente de Cozinha', 'Cumim'],
        dicaCampos: {
            resumo: 'Mencione: tipo de culinária (brasileira, italiana, confeitaria), cursos de manipulação de alimentos, BPF, tipo de estabelecimento (restaurante, hotel, indústria alimentícia).',
            experiencia: 'Informe o tipo de cozinha, volume de refeições, técnicas dominadas, cursos de formação e normas sanitárias seguidas.',
        }
    },
    limpeza: {
        label: 'Limpeza e Conservação',
        resumo: 'Profissional de limpeza e conservação com experiência em higienização de ambientes corporativos, hospitalares e residenciais, seguindo normas de biossegurança e uso correto de produtos de limpeza. Organizado, responsável e comprometido com a manutenção da higiene e bem-estar dos ambientes.',
        tecnicas: [
            'Higienização de ambientes', 'Uso de produtos de limpeza', 'Biossegurança',
            'Limpeza hospitalar', 'Coleta seletiva de resíduos', 'Limpeza de pisos e superfícies',
            'Uso de EPI', 'Desinfeção e esterilização', 'Limpeza de vidros e fachadas',
            'Controle de materiais de limpeza', 'Procedimentos operacionais padrão (POP)'
        ],
        comportamentais: [
            'Responsabilidade', 'Organização', 'Comprometimento',
            'Atenção aos detalhes', 'Proatividade', 'Trabalho em equipe',
            'Pontualidade', 'Discrição', 'Higiene pessoal',
            'Adaptabilidade', 'Disciplina', 'Eficiência'
        ],
        vagas: ['Auxiliar de Limpeza', 'Zelador', 'Faxineiro', 'Servente de Limpeza', 'Auxiliar de Serviços Gerais'],
        dicaCampos: {
            resumo: 'Mencione: tipo de ambiente (escritório, hospital, escola), produtos e equipamentos utilizados, normas de biossegurança seguidas.',
            experiencia: 'Informe o tipo de estabelecimento, tamanho da área, produtos e equipamentos utilizados, turno de trabalho.',
        }
    },
    servicosgerais: {
        label: 'Serviços Gerais',
        resumo: 'Profissional de serviços gerais com experiência em conservação de ambientes, pequenos reparos, apoio operacional e manutenção da organização e limpeza das instalações. Proativo, responsável e comprometido com o bom funcionamento do ambiente de trabalho.',
        tecnicas: [
            'Conservação de ambientes', 'Pequenos reparos', 'Pintura',
            'Hidráulica básica', 'Elétrica básica', 'Movimentação de materiais',
            'Uso de EPI', 'Limpeza e organização', 'Jardinagem básica',
            'Apoio operacional', 'Controle de materiais', 'Zeladoria'
        ],
        comportamentais: [
            'Proatividade', 'Responsabilidade', 'Organização',
            'Comprometimento', 'Trabalho em equipe', 'Pontualidade',
            'Adaptabilidade', 'Disposição', 'Atenção aos detalhes',
            'Disciplina', 'Colaboração', 'Eficiência'
        ],
        vagas: ['Auxiliar de Serviços Gerais', 'Zelador', 'Operador de Limpeza', 'Faxineiro', 'Assistente de Zeladoria'],
        dicaCampos: {
            resumo: 'Mencione: tipos de serviços realizados (hidráulica, elétrica básica, pintura), ambientes atendidos, ferramentas utilizadas.',
            experiencia: 'Informe o tipo de estabelecimento, serviços realizados, ferramentas utilizadas e equipe com quem trabalhava.',
        }
    },
    agronegocio: {
        label: 'Agronegócio',
        resumo: 'Profissional do agronegócio com experiência em operações agrícolas, manejo de culturas, operação de máquinas agrícolas e controle fitossanitário. Comprometido com a produtividade, sustentabilidade e boas práticas agropecuárias, contribuindo para os resultados da propriedade rural ou empresa do setor.',
        tecnicas: [
            'Manejo de culturas', 'Operação de máquinas agrícolas (trator, colheitadeira)',
            'Controle fitossanitário', 'Irrigação', 'Fertilização e adubação',
            'Boas Práticas Agropecuárias (BPA)', 'Rastreabilidade', 'Armazenagem de grãos',
            'Pecuária (bovinocultura, avicultura, suinocultura)', 'GPS agrícola', 'Defensivos agrícolas'
        ],
        comportamentais: [
            'Responsabilidade', 'Proatividade', 'Trabalho em equipe',
            'Adaptabilidade', 'Comprometimento', 'Organização',
            'Resistência física', 'Pontualidade', 'Atenção aos detalhes',
            'Foco em resultados', 'Disciplina', 'Colaboração'
        ],
        vagas: ['Operador de Máquinas Agrícolas', 'Auxiliar Rural', 'Tratorista', 'Técnico Agrícola', 'Assistente de Fazenda'],
        dicaCampos: {
            resumo: 'Mencione: culturas trabalhadas (soja, milho, cana), máquinas operadas, certificações e cursos da área rural, tipo de propriedade.',
            experiencia: 'Informe a cultura/atividade, equipamentos operados, área (hectares), produtos aplicados e resultados de produtividade.',
        }
    },
    meioambiente: {
        label: 'Meio Ambiente',
        resumo: 'Profissional da área ambiental com experiência em licenciamento ambiental, gestão de resíduos, monitoramento ambiental e elaboração de laudos e relatórios. Comprometido com a sustentabilidade, conformidade legal e adoção de práticas que minimizem os impactos ambientais das atividades da empresa.',
        tecnicas: [
            'Licenciamento ambiental', 'Gestão de resíduos (PGRS)', 'Monitoramento ambiental',
            'Legislação ambiental (CONAMA, IBAMA)', 'ISO 14001', 'Laudos ambientais',
            'AIA (Avaliação de Impacto Ambiental)', 'PNRS', 'GHG Protocol',
            'Coleta seletiva', 'Relatórios de sustentabilidade', 'CAR (Cadastro Ambiental Rural)'
        ],
        comportamentais: [
            'Raciocínio analítico', 'Organização', 'Comprometimento',
            'Ética profissional', 'Proatividade', 'Comunicação',
            'Trabalho em equipe', 'Responsabilidade', 'Atenção aos detalhes',
            'Pensamento sistêmico', 'Inovação', 'Foco em resultados'
        ],
        vagas: ['Analista Ambiental', 'Técnico Ambiental', 'Assistente de Meio Ambiente', 'Engenheiro Ambiental', 'Estagiário Ambiental'],
        dicaCampos: {
            resumo: 'Mencione: normas dominadas (CONAMA, ISO 14001), licenças gerenciadas, relatórios elaborados, sistemas de gestão ambiental implantados.',
            experiencia: 'Informe os processos de licenciamento, resíduos gerenciados, auditorias realizadas e resultados de conformidade.',
        }
    },
    estagio: {
        label: 'Estágio / Jovem Aprendiz',
        resumo: 'Estudante proativo e comprometido, em busca de primeira oportunidade para aplicar os conhecimentos adquiridos na formação acadêmica. Com facilidade de aprendizado, boa comunicação, interesse em crescimento profissional e disposição para contribuir com os processos da empresa.',
        tecnicas: [
            'Pacote Office (Word, Excel, PowerPoint)', 'Internet e ferramentas digitais',
            'Noções de informática', 'Redes sociais profissionais', 'Google Workspace',
            'Lógica de raciocínio', 'Pesquisa e análise de dados', 'Redação técnica',
            'Noções de administração', 'Atendimento ao cliente'
        ],
        comportamentais: [
            'Vontade de aprender', 'Proatividade', 'Comunicação',
            'Responsabilidade', 'Organização', 'Trabalho em equipe',
            'Adaptabilidade', 'Pontualidade', 'Criatividade',
            'Comprometimento', 'Resiliência', 'Curiosidade'
        ],
        vagas: ['Estagiário', 'Jovem Aprendiz', 'Auxiliar Administrativo Júnior', 'Trainee', 'Assistente Júnior'],
        dicaCampos: {
            resumo: 'Destaque: curso em andamento, projetos acadêmicos relevantes, habilidades digitais, idiomas e atividades extracurriculares. Potencial supera experiência neste perfil.',
            experiencia: 'Se não tiver experiência formal, mencione: projetos escolares, trabalhos voluntários, cursos extracurriculares, atividades em família ou comunidade.',
        }
    },
    primeiroemprego: {
        label: 'Primeiro Emprego',
        resumo: 'Candidato em busca do primeiro emprego formal, com perfil comprometido, comunicativo e com facilidade de aprendizado. Disponibilidade imediata, interesse em crescimento e desenvolvimento profissional, com habilidades em informática básica e boa apresentação pessoal.',
        tecnicas: [
            'Informática básica (Word, Excel, Internet)', 'Comunicação oral e escrita',
            'Organização pessoal', 'Redes sociais', 'Atendimento básico ao público',
            'Noções de administração', 'Pacote Office básico', 'Google Workspace'
        ],
        comportamentais: [
            'Vontade de aprender', 'Comprometimento', 'Responsabilidade',
            'Pontualidade', 'Organização', 'Comunicação',
            'Trabalho em equipe', 'Proatividade', 'Honestidade',
            'Adaptabilidade', 'Curiosidade', 'Respeito'
        ],
        vagas: ['Auxiliar Geral', 'Atendente', 'Repositor', 'Auxiliar Administrativo', 'Operador de Caixa'],
        dicaCampos: {
            resumo: 'Foque em: cursos realizados, habilidades digitais, atividades comunitárias ou escolares, disponibilidade de horário e interesse na área da vaga.',
            experiencia: 'Sem experiência formal? Mencione trabalhos voluntários, cursos, projetos escolares ou atividades que demonstrem responsabilidade e comprometimento.',
        }
    },
    outro: {
        label: 'Outro',
        resumo: 'Profissional com experiência diversificada, comprometido com a entrega de resultados, trabalho em equipe e melhoria contínua. Adaptável a diferentes ambientes e funções, com facilidade de aprendizado e foco no cumprimento das metas e objetivos organizacionais.',
        tecnicas: [
            'Pacote Office', 'Comunicação escrita e oral', 'Organização',
            'Controle de processos', 'Gestão do tempo', 'Ferramentas digitais',
            'Atendimento ao cliente', 'Trabalho em equipe', 'Análise de dados básica'
        ],
        comportamentais: [
            'Proatividade', 'Adaptabilidade', 'Comprometimento',
            'Responsabilidade', 'Organização', 'Comunicação',
            'Trabalho em equipe', 'Foco em resultados', 'Aprendizado contínuo',
            'Resolução de problemas', 'Pontualidade', 'Ética profissional'
        ],
        vagas: ['Assistente', 'Auxiliar', 'Analista Junior', 'Operador', 'Colaborador'],
        dicaCampos: {
            resumo: 'Adapte o resumo para a vaga específica que está buscando. Use palavras-chave do anúncio da vaga e destaque suas experiências mais relevantes para a função.',
            experiencia: 'Descreva suas atividades com verbos de ação: "realizei", "controlei", "organizei". Inclua resultados concretos sempre que possível.',
        }
    }
};

export const ATS_KEYWORDS_UNIVERSAIS = [
    'Trabalho em equipe', 'Comunicação', 'Organização',
    'Proatividade', 'Resolução de problemas', 'Gestão do tempo',
    'Foco em resultados', 'Adaptabilidade', 'Eficiência operacional',
    'Planejamento', 'Melhoria contínua', 'Atendimento ao cliente',
    'Análise de dados', 'Gestão de processos', 'Relacionamento interpessoal'
];

export const ATS_DICAS_CAMPOS: Record<string, any> = {
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

export const ATS_REESCRITOR = {
    padroes: [
        { regex: /trabalhei no estoque/i, saida: 'Realizei controle de estoque, conferência de mercadorias, organização de materiais e apoio aos processos logísticos, contribuindo para a eficiência operacional do setor.' },
        { regex: /atendia clientes/i, saida: 'Prestei atendimento ao cliente presencial e remoto, solucionando demandas, fornecendo suporte e contribuindo para a satisfação e fidelização dos clientes.' },
        { regex: /organizava/i, saida: 'Desenvolvi rotinas de organização e controle, garantindo a padronização dos processos e a eficiência das atividades.' },
        { regex: /ajudava/i, saida: 'Apoiei as atividades do setor, contribuindo para o cumprimento das metas e a melhoria contínua dos processos.' },
        { regex: /fazia\s+relatórios?/i, saida: 'Elaborei relatórios gerenciais e operacionais, consolidando informações para subsidiar a tomada de decisão.' }
    ]
};