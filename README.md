# 🎯 ATS Resume Generator (Gerador de Currículo Inteligente)

<p align="center">
  <img src="https://img.shields.io/github/license/JulioAndrade07-art/Gerador-de-Curriculo-ATS?style=for-the-badge&color=0d9488" alt="License GPLv3">
  <img src="https://img.shields.io/badge/Node.js-v20+-green?style=for-the-badge&logo=node.js" alt="Node Version">
  <img src="https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react" alt="React Page">
  <img src="https://img.shields.io/badge/Vite-v8.0-BD34B9?style=for-the-badge&logo=vite" alt="Vite Version">
  <img src="https://img.shields.io/badge/Version-v2.0.0-0d9488?style=for-the-badge" alt="Project Version">
</p>

Uma solução profissional, automatizada e moderna para a criação, otimização e validação de currículos voltados a sistemas **ATS** (*Applicant Tracking System*). Desenvolvido com uma arquitetura desacoplada que une a velocidade do **React** ao poder de processamento do **Node.js** para extrações baseadas em OCR e análise semântica.

---

## 📖 Sobre

Grandes empresas utilizam sistemas automatizados (ATS) para pré-selecionar currículos. Currículos que possuem imagens pesadas, tabelas complexas ou fontes ilegíveis aos robôs de leitura são descartados sumariamente. 

O **ATS Resume Generator** resolve esse problema ao fornecer uma interface que gera documentos limpos, estruturados no padrão universal de rastreamento do ATS e que podem ser baixados em formatos de compatibilidade máxima (**Microsoft Word - .docx** e **PDF**). O usuário final obtém feedbacks imediatos sobre como otimizar seu conteúdo profissional e pode, inclusive, carregar seus registros de emprego prévios na hora importando os dados de sua carteira de trabalho digital num clique.

---

## 📺 Demonstração

*Espaço reservado para capturas de tela e GIFs demonstrativos da aplicação em execução:*

![Interface do Gerador de Currículo ATS](<img width="1554" height="936" alt="image" src="https://github.com/user-attachments/assets/d0dd70eb-483f-43c8-b2fe-2de269e9acef" />
) <!-- Insira a imagem do dashboard aqui -->

---

## ✨ Funcionalidades

* **🧠 Motor ATS Score Integrado:** Analisa a estrutura e o vocabulário em tempo real, fornecendo feedbacks e uma nota de `0 a 100` com guias de melhoria.
* **✨ Otimizador e Auto-Preenchimento por Área:** Permite que o usuário insira templates ideais com base em cargos padrão de mercado (TI, Administração, Comercial, RH, Finanças, Compras, Produção, etc.).
* **📤 Leitor da Carteira de Trabalho Digital (CTPS):** Importação inteligente de dados do PDF oficial da Carteira de Trabalho para o formulário.
* **👁️ Split-View Dinâmico (Feedback Instantâneo):** Conforme os dados são alterados, o design do documento A4 é renderizado na tela.
* **🌐 Consumo Dinâmico do IBGE:** Preenchimento dinâmico de Cidades e Estados buscando direto das APIs públicas brasileiras.
* **📄 Exportação Dupla Profissional:**
  * **Microsoft Word (.docx):** Livre de tabelas invisíveis, ideal para scanners ATS.
  * **PDF Impecável:** PDF renderizado em folha única, perfeitamente compatível para impressão.
* **💚 Painel de Doação PIX Integrado:** Interface flutuante com QR Code e recurso "Copia e Cola" dinâmico para facilitar o apoio voluntário do projeto.

---

## 🎨 Arquitetura Completa

O projeto adota uma arquitetura cliente-servidor para executar processamento computacional intensivo (como o reconhecimento de caracteres em imagens) sem diminuir o desempenho da tela.

```
+-------------------------------------------------------+
|                   FRONTEND (React)                    |
|  - Edição de Campos                                   |
|  - Visualização de PDF em tempo real                  |
|  - Motor Local de Validação de Score (atsEngine)      |
+-------------------------------------------------------+
                           │
       Upload do PDF       │ API Requests
         da CTPS           ▼ (/api/upload, /api/health)
+-------------------------------------------------------+
|                    BACKEND (Node)                     |
|  - upload de buffer temporário via Multer             |
|  - Processamento do PDF-Parse (Extração Digital)      |
|  - OCR local via Tesseract.js (Failsafe para Imagens) |
|  - Mapeador de Padrões Regex (Parser de Empregos)      |
+-------------------------------------------------------+
                           │
    JSON Estruturado       │
       da Carteira         ▼
+-------------------------------------------------------+
|                   PREENCHIMENTO                       |
|               Automático no React                     |
+-------------------------------------------------------+
```

---

## 🗂 Estrutura do Projeto

Abaixo está o mapeamento dos repositórios internos e seus módulos:

```text
Gerador-de-Curriculo-ATS/
├── backend-node/                 # APIs e Serviços de Processamento (Servidor)
│   ├── src/
│   │   └── server.js             # Rotas de Upload, Expressões de OCR e Middleware
│   ├── uploads/                  # Buffer temporário para processamento de arquivos
│   ├── package.json              # Dependências e bibliotecas do backend
│   ├── tsconfig.json             # Configuração do compilador TypeScript
│   └── por.traineddata           # Modelos locais de linguagem em Português para OCR
│
├── frontend-react/               # Interface Gráfica do Usuário (Cliente Web)
│   ├── dist/                     # Bundle otimizado gerado para produção
│   ├── public/                   # Arquivos estáticos (Favoritos, Imagens, QR Code)
│   ├── src/
│   │   ├── components/           # Componentes do Dashboard e Formulários
│   │   │   ├── AtsPanel.tsx      # Barra de Progresso e Métricas do Score
│   │   │   ├── CtpsImporter.tsx  # Input de Upload e Processador do retorno
│   │   │   ├── DonationModal.tsx # Pop-up animado de Doações/PIX
│   │   │   └── FormPanel.tsx     # Acoplamento de Editores colapsáveis
│   │   ├── contexts/
│   │   │   └── ResumeContext.tsx # Context API que dita o Estado e LocalStorage do App
│   │   ├── data/
│   │   │   └── atsData.ts        # Modelos estáticos de Vagas e Dicas de Scanners
│   │   ├── services/
│   │   │   ├── atsEngine.ts      # Verificações de String e Algoritmo de Score
│   │   │   ├── docxService.ts    # Mapeamento do template compatível com Word
│   │   │   └── pdfService.ts     # Configurações do Canvas de Exportação de PDF
│   │   ├── App.css               # Folha de Estilos dos Modais e Botões
│   │   └── index.css             # Cores institucionais e Tokens de Design
│   └── tsconfig.json             # Configurações do ecossistema TypeScript
└── README.md
```

---

## 🛠 Tecnologias Utilizadas

### Frontend
- **React (v19):** Arquiteturas baseadas em componentes reativos para formulários complexos.
- **TypeScript:** Fornece tipagem estática confiável para impedir bugs em arrays de histórico.
- **Vite:** Build runner extremamente veloz em comparação a bundlers legados.
- **HTML5 & Vanilla CSS:** Design Responsivo com CSS Grid e variáveis globais.
- **html2pdf.js / html2canvas / jsPDF:** Renderizador de canvas vetoriais no cliente.
- **html-to-docx:** Geração de documento de texto rico offline em formato binário `.docx`.

### Backend
- **Node.js + Express:** Servidor back-end robusto e assíncrono.
- **Tesseract.js (v5.1):** OCR open-source rodando offline no servidor para digitalizar papéis escaneados ou imagens.
- **pdf-parse:** Parser leve que lê stream de dados de arquivos PDF nativos.
- **Multer:** Middleware para gerenciamento seguro e recepção de upload de arquivos binários.

---

## 🚀 Instalação e Execução

### Pré-requisitos
* **Node.js** instalado na sua máquina (versão recomendado v20 ou superior).

### Instalação Completa
Instale as dependências executando os passos no diretório do projeto:

```bash
# Clone o repositório
git clone https://github.com/JulioAndrade07-art/Gerador-de-Curriculo-ATS.git
cd Gerador-de-Curriculo-ATS

# Configure o Frontend
cd frontend-react
npm install

# Configure o Backend
cd ../backend-node
npm install
```

### Como Executar

#### Modo de Desenvolvimento Separado
Você pode rodar cada aplicação em um terminal dedicado:

* **Inverter o Servidor Backend (API):**
  ```bash
  cd backend-node
  npm run start (ou node src/server.js)
  ```
  *(O servidor escutará na porta de rede `3000`)*

* **Inicializar o Servidor Frontend (Vite):**
  ```bash
  cd frontend-react
  npm run dev
  ```
  *(Iniciará o servidor de desenvolvimento na porta descrita pelo Vite, normalmente `5173`)*

#### Executando Tudo Unificado (Produção)
Através do script integrado no frontend, você pode compilar a aplicação e expor o backend de maneira integrada:

```bash
cd frontend-react
npm run start:full
```
Este comando executa o build dos arquivos estáticos na pasta `/dist` do front-end e abre o servidor Express na porta `3000`, servindo tanto a API quanto a interface visual no mesmo endereço local: **`http://localhost:3000`**.

---

## 🌟 Evolução e Versões

### Comparação Técnica das Versões

| Recurso | Versão Antiga (V1 - Vanilla) | Versão Atual (V2 - React + Node) |
| :--- | :--- | :--- |
| **Tecnologia Base** | HTML / Vanilla JavaScript | React 19 + TypeScript / Node.js |
| **Estrutura** | Monolito de Arquivo Único (index, script) | Arquitetura Cliente-Servidor Desacoplada |
| **Escalabilidade** | Baixa (Dificuldade de evoluir inputs) | Altíssima (Módulos, Componentes e Context) |
| **Uso de Dependências** | Via CDN (dependia de conexões de terceiros) | Gerenciadas via `npm` local (Seguro offline) |
| **Leitura de Arquivos (CTPS)**| Inexistente (Apenas digitação) | Nativa no Backend (pdf-parse + Tesseract OCR) |
| **Interface de Estilos** | CSS Clássico ad-hoc | Sistema de cores e abas colapsáveis dinâmicas |
| **Geração de Word** | Script simples em Javascript | Biblioteca dedicada gerando estrutura DOCX real |
| **Manutenção Geral** | Complexa (arquivos gigantes) | Muito simples (arquivos focados e tipados) |

---

## 🗺️ Roadmap de Melhorias Futuras

- [ ] Integração com Modelos de Linguagem (APIs de IA) para sugestão personalizada de atividades baseadas no cargo.
- [ ] Exportação direta para Google Drive.
- [ ] Criação de temas visuais alternativos para o currículo (Layouts Modernos, Criativos e Acadêmicos).
- [ ] Inclusão de gerador automático de cartas de apresentação baseadas na descrição da vaga.

---

## 📜 Licença

Este projeto é disponibilizado sob a licença **GNU General Public License v3.0 (GPLv3)** - Consulte os detalhes no arquivo [LICENSE](LICENSE) para termos de modificações ou uso derivado.

---

## 👥 Autor

Desenvolvido por **Julio Andrade**. Conecte-se comigo!

* **GitHub:** [@JulioAndrade07-art](https://github.com/JulioAndrade07-art)
* **LinkedIn:** [Julio Andrade](https://linkedin.com) <!-- Insira seu link caso queira -->
