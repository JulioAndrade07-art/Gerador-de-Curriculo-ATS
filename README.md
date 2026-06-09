<h1 align="center">Gerador de Currículo Inteligente (Otimizado para ATS) 🎯</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Licen%C3%A7a-GPLv3-blue.svg" alt="License GPLv3">
  <img src="https://img.shields.io/badge/Feito%20com-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E.svg" alt="Feito com HTML CSS JS">
</p>

Uma ferramenta web poderosa e inteligente para geração de **Currículos Profissionais otimizados para ATS (Applicant Tracking Systems)**. Desenvolvida para ajudar candidatos a passarem pelos filtros automáticos de grandes empresas, gerando currículos limpos, diretos e com palavras-chave estratégicas.

## ✨ Funcionalidades

- 🧠 **Motor ATS Integrado**: Analisa seu currículo em tempo real e dá uma pontuação (0 a 100) baseada nas melhores práticas de recrutamento.
- 🎯 **Análise de Vagas**: Cole a descrição da vaga que você quer e o sistema identifica automaticamente as palavras-chave necessárias e sugere melhorias.
- 💡 **Auto-Preenchimento Inteligente**: Escolha sua área (TI, Logística, Atendimento, etc.) e o sistema sugere o Resumo Profissional e Habilidades com base no mercado atual.
- 📄 **Exportação Dupla**: Gere seu currículo em formato **Word (.doc)** perfeito para os robôs ATS lerem, ou em **PDF** formatado em 1 página, pronto para impressão.
- 📱 **Interface Fluida e Responsiva**: Funciona no celular e conta com uma interface dividida que mostra o resultado final em tempo real (Split View).
- 📍 **Conexão com API do IBGE**: Seleção dinâmica de Estado (UF) e Cidade diretamente da base oficial do Brasil.
- 💬 **WhatsApp Dinâmico**: Gera um link seguro que permite que os recrutadores cliquem e falem diretamente com você pelo WhatsApp no PDF.

## 🚀 Como Usar

O projeto funciona diretamente no navegador, sem precisar instalar nada no seu computador!

1. Clone o repositório ou baixe o arquivo `.zip`.
2. Dê um duplo-clique no arquivo `gerador_curriculo.html` para abri-lo no seu navegador favorito (Chrome, Firefox, Edge, etc).
3. Preencha seus dados na coluna da esquerda. O preview do currículo é gerado instantaneamente na coluna da direita.
4. Use a aba **"🎯 Otimizador ATS Inteligente"** no topo da tela para alinhar seu currículo com as vagas que deseja.
5. Clique em `Exportar PDF` ou `Exportar Word`!

> 💡 **Nota do Autor (Exemplo)**: O código atual carrega o meu próprio currículo (Julio Andrade) quando você o abre pela primeira vez, para servir de demonstração visual de como a formatação se comporta ao estar completa. Sinta-se à vontade para deletar tudo e colocar seus dados! Os dados digitados são salvos no seu próprio navegador para você não perder trabalho.

## 🗂 Estrutura do Projeto

O projeto é modular e feito com código Vanilla (puro), ideal para quem está iniciando em front-end.

- `gerador_curriculo.html`: A estrutura visual e a interface limpa em português brasileiro.
- `style.css`: Toda a estilização. Utiliza CSS Grid, Flexbox e regras em `@media print` para exportação impecável.
- `script.js`: O coração da ferramenta. Controla armazenamento no navegador (LocalStorage), importação do IBGE (Fetch API), comunicação com as bibliotecas e geração de PDF/Word.
- `ats_data.js`: O "Banco de Dados" estático. Contém os templates de resumos, soft skills, hard skills e dicionário de palavras-chave divididos por áreas do mercado.
- `ats_engine.js`: O "Cérebro" do ATS. Calcula a pontuação e os arrays de intersecção entre o que você digitou e as palavras-chave da vaga que você colou, além de gerenciar os balões de dica contextuais.

## 📚 Bibliotecas Utilizadas

Este projeto não possui um `package.json` complicado nem build steps complexos de Node.js. Ele consome as bibliotecas via CDN diretamente no HTML:

- `html2pdf.js / html2canvas / jsPDF`: Para a captura da tela e montagem perfeita do documento PDF em página A4.
- `lucide`: Conjunto de ícones vetoriais modernos.
- `API do IBGE (Localidades)`: Para buscar Estados e Municípios gratuitamente em tempo real.

## 📜 Licença (Open Source Seguro)

Este projeto está sob a licença **GNU General Public License v3.0 (GPLv3)**.
Isso garante que o projeto será **sempre 100% de código aberto**.

**O que você PODE fazer:**
- Usar livremente para construir seu próprio currículo modificado.
- Estudar o código e hospedar na sua própria página no GitHub Pages, Vercel, etc.
- Modificar, adicionar botões, mudar o design de tudo.

**O que você NÃO PODE fazer (Anti-Plágio):**
- Você **não pode** pegar este código, mudar o nome, e vendê-lo ou fechar o código-fonte (não pode virar software proprietário).
- Quaisquer cópias ou modificações deste código (projetos derivados) DEVEM OBRIGATORIAMENTE ser distribuídos abertamente sob esta mesma licença GPLv3 e DEVEM conter atribuição de crédito ao autor original.

---
Feito com 💡 e Código Limpo. Boas entrevistas!
