// ==================== ESTADO ====================
const KEY = 'curriculo_ats_data';

let dados = {
  nome: 'JULIO CESAR ANDRADE',
  cidade: 'Araxá, MG, Brasil',
  estado_uf: 'MG',
  cidade_nome: 'Araxá',
  data_nascimento: '2004-01-01',
  tel: '(34) 98851-6219',
  cnh: 'A',
  email: 'julioandrade0706@gmail.com',
  linkedin: 'linkedin.com/in/julio-cesar-andrade-802950206',
  github: 'github.com/JulioAndrade07-art',
  resumo: 'Estudante de Banco de Dados e técnico formado em Informática e Programação de Jogos. Possuo conhecimentos em desenvolvimento de software, lógica de programação, banco de dados, suporte técnico e ferramentas digitais. Tenho experiência profissional com organização de dados, controle de estoque e uso de planilhas. Perfil proativo, organizado e com facilidade de aprendizado, com interesse em tecnologia, desenvolvimento de sistemas e inovação.',
  experiencias: [
    {
      cargo: 'Almoxarife', empresa: 'MOSAIC FERTILIZANTES', periodo: 'Fevereiro/2026 – Atual',
      bullets: 'Controle e organização do estoque de insumos e materiais industriais\nRecebimento, conferência e distribuição de materiais aos setores solicitantes\nApoio na gestão de inventários e registros de entrada e saída de itens'
    },
    {
      cargo: 'Auxiliar de Almoxarifado', empresa: 'Centro de Hemodiálise de Araxá', periodo: 'Setembro/2024 – Agosto/2025',
      bullets: 'Controle e organização do estoque utilizando planilhas eletrônicas (Excel/Google Sheets)\nManutenção básica de redes e suporte técnico a equipamentos e sistemas\nRegistro e atualização de dados de materiais hospitalares com atenção à acurácia'
    }
  ],
  formacoes: [
    { curso: 'Tecnólogo em Banco de Dados', instituicao: 'UFTM – Universidade Federal do Triângulo Mineiro', periodo: '2026 – 2029', status: 'Em andamento' },
    { curso: 'Técnico em Programação de Jogos', instituicao: 'SENAI', periodo: '2025 – 2026', status: 'Concluído' },
    { curso: 'Técnico em Informática', instituicao: 'SENAC Minas', periodo: '2022 – 2024', status: 'Concluído' },
    { curso: 'Bacharelado em Engenharia de Software', instituicao: 'Faculdade Anhanguera', periodo: '2022 – 2026', status: 'Curso em pausa' },
  ],
  cursos: [
    { nome: 'Auxiliar de Logística', instituicao: 'EWCursos', carga: '40hrs', status: 'Concluído' },
    { nome: 'Auxiliar de Almoxarifado', instituicao: 'Curso Online Educa', carga: '40hrs', status: 'Concluído' },
  ],
  habTech: 'Lógica de programação e desenvolvimento de software\nBanco de dados (SQL e modelagem de dados)\nLinguagens: C, JavaScript, Python, HTML + CSS\nSuporte técnico básico e manutenção de redes\nExcel e Google Sheets (nível intermediário)',
  habSoft: 'Organização e análise de dados\nRaciocínio lógico e resolução de problemas\nComunicação escrita e oral\nInglês: nível intermediário (leitura técnica e comunicação básica)\nPerfil analítico, proativo e com facilidade para aprender novas ferramentas'
};

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', () => {
  carregarDoStorage();

  const isFirstVisit = !localStorage.getItem('sawWelcomeModal');
  if (isFirstVisit) {
    const modal = document.getElementById('modal-welcome');
    if (modal) modal.classList.add('show');
  }

  if (!dados.estado_uf && dados.cidade && dados.cidade.includes(', ')) {
    const parts = dados.cidade.split(', ');
    dados.cidade_nome = parts[0];
    dados.estado_uf = parts[1];
  }

  renderizarFormulario();
  atualizar();
  escalarPreview();
  window.addEventListener('resize', escalarPreview);

  // Restaurar área ATS salva
  if (dados.atsArea) {
    const areaEl = document.getElementById('ats-area');
    if (areaEl) areaEl.value = dados.atsArea;
    const wrapper = document.getElementById('ats-autofill-wrapper');
    if (wrapper) wrapper.style.display = 'block';
  }
  if (dados.atsVaga) {
    const vagaEl = document.getElementById('ats-vaga');
    if (vagaEl) vagaEl.value = dados.atsVaga;
  }

  carregarEstados().then(() => {
    if (dados.estado_uf) {
      document.getElementById('estado').value = dados.estado_uf;
      carregarCidades(dados.estado_uf).then(() => {
        if (dados.cidade_nome) {
          document.getElementById('cidade').value = dados.cidade_nome;
        }
        atualizar();
      });
    }
  });

  // Inicializar tooltips ATS
  initTooltipsATS();
  atualizarPainelATS();
});

function escalarPreview() {
  const panel = document.querySelector('.preview-panel');
  const cv = document.getElementById('cv-preview');
  if (!panel || !cv) return;
  const disponivel = panel.clientWidth - 56;
  const escala = Math.min(1, disponivel / 794);
  cv.style.transform = `scale(${escala})`;
  cv.style.marginBottom = `${(cv.offsetHeight * escala) - cv.offsetHeight + 28}px`;
}

// ==================== FORMULÁRIO ====================
function renderizarFormulario() {
  // campos simples
  document.getElementById('nome').value = dados.nome;
  document.getElementById('data_nascimento').value = dados.data_nascimento || '';
  document.getElementById('tel').value = dados.tel;
  document.getElementById('cnh').value = dados.cnh || '';
  document.getElementById('email').value = dados.email;
  document.getElementById('linkedin').value = dados.linkedin;
  document.getElementById('github').value = dados.github;
  document.getElementById('resumo').value = dados.resumo;
  document.getElementById('hab-tech').value = dados.habTech;
  document.getElementById('hab-soft').value = dados.habSoft;
  renderExpList();
  renderEduList();
  renderCursoList();
}

function colherCamposSimples() {
  dados.nome = document.getElementById('nome').value;

  const ufEl = document.getElementById('estado');
  const cidEl = document.getElementById('cidade');
  if (ufEl && cidEl) {
    dados.estado_uf = ufEl.value;
    dados.cidade_nome = cidEl.value;
    if (dados.estado_uf && dados.cidade_nome) {
      dados.cidade = `${dados.cidade_nome}, ${dados.estado_uf}, Brasil`;
    } else {
      dados.cidade = '';
    }
  }

  dados.data_nascimento = document.getElementById('data_nascimento').value;
  dados.tel = document.getElementById('tel').value;
  dados.cnh = document.getElementById('cnh').value;
  dados.email = document.getElementById('email').value;
  dados.linkedin = document.getElementById('linkedin').value;
  dados.github = document.getElementById('github').value;
  dados.resumo = document.getElementById('resumo').value;
  dados.habTech = document.getElementById('hab-tech').value;
  dados.habSoft = document.getElementById('hab-soft').value;
}

// ==================== EXPERIÊNCIA ====================
function renderExpList() {
  const el = document.getElementById('exp-list');
  el.innerHTML = '';
  dados.experiencias.forEach((exp, i) => {
    el.innerHTML += `
    <div class="item-card">
      <button class="remove-btn" onclick="removeExp(${i})">✕</button>
      <div class="field-row">
        <div class="field"><label>Cargo</label><input value="${esc(exp.cargo)}" oninput="dados.experiencias[${i}].cargo=this.value;salvar();atualizar()"></div>
        <div class="field"><label>Período</label><input value="${esc(exp.periodo)}" oninput="dados.experiencias[${i}].periodo=this.value;salvar();atualizar()"></div>
      </div>
      <div class="field"><label>Empresa</label><input value="${esc(exp.empresa)}" oninput="dados.experiencias[${i}].empresa=this.value;salvar();atualizar()"></div>
      <div class="field"><label>Atividades (uma por linha)</label><textarea oninput="dados.experiencias[${i}].bullets=this.value;salvar();atualizar()" rows="3">${esc(exp.bullets)}</textarea></div>
    </div>`;
  });
}

function addExp() {
  dados.experiencias.push({ cargo: '', empresa: '', periodo: '', bullets: '' });
  renderExpList(); atualizar();
}
function removeExp(i) { dados.experiencias.splice(i, 1); renderExpList(); atualizar(); }

// ==================== FORMAÇÃO ====================
function renderEduList() {
  const el = document.getElementById('edu-list');
  el.innerHTML = '';
  dados.formacoes.forEach((f, i) => {
    el.innerHTML += `
    <div class="item-card">
      <button class="remove-btn" onclick="removeEdu(${i})">✕</button>
      <div class="field"><label>Curso / Grau</label><input value="${esc(f.curso)}" oninput="dados.formacoes[${i}].curso=this.value;salvar();atualizar()"></div>
      <div class="field"><label>Instituição</label><input value="${esc(f.instituicao)}" oninput="dados.formacoes[${i}].instituicao=this.value;salvar();atualizar()"></div>
      <div class="field-row">
        <div class="field"><label>Período</label><input value="${esc(f.periodo)}" oninput="dados.formacoes[${i}].periodo=this.value;salvar();atualizar()"></div>
        <div class="field"><label>Status</label>
          <select oninput="dados.formacoes[${i}].status=this.value;salvar();atualizar()">
            ${['Concluído', 'Em andamento', 'Curso em pausa', 'Trancado'].map(s => `<option ${f.status === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>`;
  });
}
function addEdu() { dados.formacoes.push({ curso: '', instituicao: '', periodo: '', status: 'Em andamento' }); renderEduList(); atualizar(); }
function removeEdu(i) { dados.formacoes.splice(i, 1); renderEduList(); atualizar(); }

// ==================== CURSOS ====================
function renderCursoList() {
  const el = document.getElementById('curso-list');
  el.innerHTML = '';
  dados.cursos.forEach((c, i) => {
    el.innerHTML += `
    <div class="item-card">
      <button class="remove-btn" onclick="removeCurso(${i})">✕</button>
      <div class="field"><label>Nome do Curso</label><input value="${esc(c.nome)}" oninput="dados.cursos[${i}].nome=this.value;salvar();atualizar()"></div>
      <div class="field-row">
        <div class="field"><label>Instituição</label><input value="${esc(c.instituicao)}" oninput="dados.cursos[${i}].instituicao=this.value;salvar();atualizar()"></div>
        <div class="field"><label>Carga horária</label><input value="${esc(c.carga)}" oninput="dados.cursos[${i}].carga=this.value;salvar();atualizar()"></div>
      </div>
      <div class="field"><label>Status</label>
        <select oninput="dados.cursos[${i}].status=this.value;salvar();atualizar()">
          ${['Concluído', 'Em andamento'].map(s => `<option ${c.status === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>`;
  });
}
function addCurso() { dados.cursos.push({ nome: '', instituicao: '', carga: '', status: 'Concluído' }); renderCursoList(); atualizar(); }
function removeCurso(i) { dados.cursos.splice(i, 1); renderCursoList(); atualizar(); }

// ==================== PREVIEW ====================
function atualizar() {
  colherCamposSimples();
  salvar();

  const d = dados;

  let idadeTexto = '';
  if (d.data_nascimento) {
    const parts = d.data_nascimento.split('-');
    if (parts.length === 3) {
      const hoje = new Date();
      const nascYear = parseInt(parts[0], 10);
      const nascMonth = parseInt(parts[1], 10) - 1;
      const nascDay = parseInt(parts[2], 10);
      let idadeCalc = hoje.getFullYear() - nascYear;
      if (hoje.getMonth() < nascMonth || (hoje.getMonth() === nascMonth && hoje.getDate() < nascDay)) {
        idadeCalc--;
      }
      idadeTexto = idadeCalc + ' anos';
    }
  }

  let cnhTexto = '';
  if (d.cnh) {
    cnhTexto = 'CNH: ' + d.cnh;
  }

  const contato1Parts = [];
  if (d.cidade) contato1Parts.push(h(d.cidade));
  if (idadeTexto) contato1Parts.push(idadeTexto);
  if (cnhTexto) contato1Parts.push(cnhTexto);

  if (d.tel) {
    const numeros = d.tel.replace(/\D/g, '');
    let waLink = numeros;
    if (numeros.length === 10 || numeros.length === 11) {
      waLink = '55' + numeros;
    }
    if (waLink.length >= 10) {
      contato1Parts.push(`<a href="https://wa.me/${waLink}" target="_blank">${h(d.tel)}</a>`);
    } else {
      contato1Parts.push(h(d.tel));
    }
  }

  if (d.email) contato1Parts.push(`<a href="mailto:${h(d.email)}">${h(d.email)}</a>`);
  const contato2Parts = [];

  if (d.linkedin) {
    let url = d.linkedin.trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    contato2Parts.push(`LinkedIn: <a href="${url}" target="_blank">${h(d.linkedin)}</a>`);
  }
  if (d.github) {
    let url = d.github.trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    contato2Parts.push(`GitHub: <a href="${url}" target="_blank">${h(d.github)}</a>`);
  }

  const expHTML = d.experiencias.map(e => `
    <div class="cv-job-title">${h(e.cargo)}</div>
    <div class="cv-job-meta">${h(e.empresa)}${e.periodo ? ' &nbsp;|&nbsp; ' + h(e.periodo) : ''}</div>
    <ul>${e.bullets.split('\n').filter(b => b.trim()).map(b => `<li>${h(b)}</li>`).join('')}</ul>
  `).join('');

  const eduHTML = d.formacoes.map(f => `
    <div class="cv-edu-degree">${h(f.curso)}</div>
    <div class="cv-edu-meta">${h(f.instituicao)} | ${h(f.periodo)} (${h(f.status)})</div>
  `).join('');

  const cursoHTML = d.cursos.length ? `
    <div class="cv-section-title">Cursos e Certificações</div>
    ${d.cursos.map(c => `
      <div class="cv-edu-degree">${h(c.nome)}</div>
      <div class="cv-edu-meta">${h(c.instituicao)} | ${h(c.carga)} (${h(c.status)})</div>
    `).join('')}
  ` : '';

  const techList = d.habTech.split('\n').filter(x => x.trim()).map(x => `<li>${h(x)}</li>`).join('');
  const softList = d.habSoft.split('\n').filter(x => x.trim()).map(x => `<li>${h(x)}</li>`).join('');

  document.getElementById('cv-preview').innerHTML = `
    <div class="cv-name">${h(d.nome) || 'SEU NOME'}</div>
    <div class="cv-contact">${contato1Parts.join('  |  ')}</div>
    ${contato2Parts.length ? `<div class="cv-contact">${contato2Parts.join('  |  ')}</div>` : ''}

    ${d.resumo ? `
    <div class="cv-section-title">Resumo Profissional</div>
    <div class="cv-summary">${h(d.resumo)}</div>` : ''}

    ${d.experiencias.length ? `
    <div class="cv-section-title">Experiência Profissional</div>
    ${expHTML}` : ''}

    ${d.formacoes.length ? `
    <div class="cv-section-title">Formação Acadêmica</div>
    ${eduHTML}` : ''}

    ${cursoHTML}

    ${(techList || softList) ? `
    <div class="cv-section-title">Habilidades e Competências</div>
    <div class="cv-skills-cols">
      ${techList ? `<div><div class="cv-skills-label">Habilidades Técnicas</div><ul>${techList}</ul></div>` : ''}
      ${softList ? `<div><div class="cv-skills-label">Habilidades Complementares</div><ul>${softList}</ul></div>` : ''}
    </div>
    ` : ''}
  `;

  // Atualizar painel ATS
  if (typeof atualizarPainelATS === 'function') atualizarPainelATS();
}

// ==================== UTILS ====================
function h(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function esc(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toggleSection(id, tab) {
  const body = document.getElementById(id);
  body.classList.toggle('hidden');
  tab.classList.toggle('collapsed');
}

// ==================== STORAGE ====================
let saveTimer;
function salvar() {
  clearTimeout(saveTimer);
  document.getElementById('save-dot').style.background = '#facc15';
  document.getElementById('save-label').textContent = 'Salvando...';
  saveTimer = setTimeout(() => {
    try {
      // Salvar dados ATS extras
      const areaEl = document.getElementById('ats-area');
      const vagaEl = document.getElementById('ats-vaga');
      if (areaEl) dados.atsArea = areaEl.value;
      if (vagaEl) dados.atsVaga = vagaEl.value;

      localStorage.setItem(KEY, JSON.stringify(dados));
      document.getElementById('save-dot').style.background = '#4ade80';
      document.getElementById('save-label').textContent = 'Salvo';
    } catch (e) { }
  }, 600);
}

function carregarDoStorage() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const salvo = JSON.parse(raw);
      dados = { ...dados, ...salvo };
    }
  } catch (e) { }
}

function limparTudo() {
  if (!confirm('Limpar todos os dados e começar do zero?')) return;
  const dVazio = {
    nome: '', cidade: '', estado_uf: '', cidade_nome: '',
    data_nascimento: '', tel: '', cnh: '', email: '', linkedin: '', github: '', resumo: '',
    experiencias: [], formacoes: [], cursos: [], habTech: '', habSoft: '',
    atsArea: '', atsVaga: ''
  };
  localStorage.setItem(KEY, JSON.stringify(dVazio));
  location.reload();
}

// ==================== BOAS VINDAS ====================
function iniciarComExemplo() {
  localStorage.setItem('sawWelcomeModal', 'true');
  const m = document.getElementById('modal-welcome');
  if (m) m.classList.remove('show');
}

function iniciarZerado() {
  localStorage.setItem('sawWelcomeModal', 'true');
  const dVazio = {
    nome: '', cidade: '', estado_uf: '', cidade_nome: '',
    data_nascimento: '', tel: '', cnh: '', email: '', linkedin: '', github: '', resumo: '',
    experiencias: [], formacoes: [], cursos: [], habTech: '', habSoft: '',
    atsArea: '', atsVaga: ''
  };
  localStorage.setItem(KEY, JSON.stringify(dVazio));
  location.reload();
}

function exportarPDF() {
  mostrarToast('⏳ Gerando PDF...');
  const el = document.getElementById('cv-preview');

  // No celular/iOS, o width 100% quebra o PDF, usamos body.exporting-pdf para forçar 794px exatos
  document.body.classList.add('exporting-pdf');

  // Adicionamos parâmetros robustos de compatibilidade mobile base para html2pdf
  const opt = {
    margin: 0,
    filename: `Curriculo_${(dados.nome || 'CV').replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      windowWidth: 794 // Enganar render mobile
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // Tempo para o navegador repintar com 794px antes de "tirar a foto"
  setTimeout(() => {
    html2pdf().set(opt).from(el).save().then(() => {
      document.body.classList.remove('exporting-pdf');
      mostrarToast('✅ PDF exportado com sucesso!');
      setTimeout(() => {
        mostrarToast('Gostou? Considere doar um PIX no botão verde! 💚');
      }, 3500);
    }).catch(err => {
      document.body.classList.remove('exporting-pdf');
      mostrarToast('❌ Erro na geração. Feche outras abas e tente novamente!');
      console.error(err);
    });
  }, 300);
}

// ==================== EXPORTAR DOCX (via Blob de HTML) ====================
function exportarDocx() {
  mostrarToast('📄 Gerando arquivo Word...');
  const conteudo = document.getElementById('cv-preview').innerHTML;

  const docxHTML = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<meta name=ProgId content=Word.Document>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 10pt; }
  .cv-name { text-align: center; font-size: 20pt; font-weight: bold; color: #1F3864; margin-bottom: 6px; }
  .cv-contact { text-align: center; font-size: 8.5pt; color: #444; margin-bottom: 3px; }
  .cv-section-title { font-size: 10pt; font-weight: bold; color: #1F3864; text-transform: uppercase;
    border-bottom: 2pt solid #1F3864; margin-top: 14px; margin-bottom: 6px; padding-bottom: 2px; }
  .cv-job-title { font-size: 9.5pt; font-weight: bold; margin-top: 8px; }
  .cv-job-meta { font-size: 8.5pt; color: #555; font-style: italic; }
  .cv-edu-degree { font-size: 9.5pt; font-weight: bold; margin-top: 6px; }
  .cv-edu-meta { font-size: 8.5pt; color: #555; }
  .cv-summary { font-size: 9.5pt; }
  ul { margin: 0; padding-left: 18px; }
  li { font-size: 9pt; margin-bottom: 2px; }
  .cv-skills-label { font-size: 9pt; font-weight: bold; margin-top: 6px; }
  .cv-skills-group { margin-top: 4px; }
  a { color: #1F3864; text-decoration: none; }
</style>
</head>
<body>${conteudo}</body>
</html>`;

  const blob = new Blob(['\ufeff', docxHTML], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Curriculo_${(dados.nome || 'CV').replace(/\s+/g, '_')}.doc`;
  a.click();
  URL.revokeObjectURL(url);
  setTimeout(() => {
    mostrarToast('✅ Arquivo Word exportado!');
    setTimeout(() => {
      mostrarToast('Gostou? Considere doar um PIX no botão verde! 💚');
    }, 3500);
  }, 400);
}

// ==================== TOAST ====================
function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(mostrarToast._t);
  mostrarToast._t = setTimeout(() => t.classList.remove('show'), 3000);
}

// ==================== IBGE API ====================
async function carregarEstados() {
  try {
    const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
    const estados = await res.json();
    const select = document.getElementById('estado');
    select.innerHTML = '<option value="">Selecione o Estado</option>';
    estados.forEach(uf => {
      const opt = document.createElement('option');
      opt.value = uf.sigla;
      opt.textContent = `${uf.nome} (${uf.sigla})`;
      select.appendChild(opt);
    });
  } catch (e) {
    console.error('Erro ao carregar estados', e);
  }
}

async function carregarCidades(ufSigla) {
  const cidadeSelect = document.getElementById('cidade');
  if (!ufSigla) {
    cidadeSelect.innerHTML = '<option value="">Selecione o Estado primeiro</option>';
    cidadeSelect.disabled = true;
    return;
  }
  cidadeSelect.innerHTML = '<option value="">Carregando cidades...</option>';
  cidadeSelect.disabled = true;
  try {
    const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSigla}/municipios`);
    const cidades = await res.json();
    cidadeSelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    cidades.forEach(cid => {
      const opt = document.createElement('option');
      opt.value = cid.nome;
      opt.textContent = cid.nome;
      cidadeSelect.appendChild(opt);
    });
    cidadeSelect.disabled = false;
  } catch (e) {
    console.error('Erro ao carregar cidades', e);
    cidadeSelect.innerHTML = '<option value="">Erro ao carregar</option>';
  }
}

// ==================== ATS HANDLERS ====================
function onAreaChange(areaKey) {
  const wrapper = document.getElementById('ats-autofill-wrapper');
  if (areaKey && ATS_AREAS[areaKey]) {
    if (wrapper) wrapper.style.display = 'block';
  } else {
    if (wrapper) wrapper.style.display = 'none';
  }
  atualizarPainelATS();
  salvar();
}

function analisarDescricaoVaga() {
  const desc = document.getElementById('ats-descricao').value;
  if (desc.trim().length > 30) {
    const areaDetectada = detectarAreaPorVaga(desc);
    if (areaDetectada) {
      const areaEl = document.getElementById('ats-area');
      if (areaEl && !areaEl.value) {
        areaEl.value = areaDetectada;
        onAreaChange(areaDetectada);
        mostrarToast(`🎯 Área detectada: ${ATS_AREAS[areaDetectada].label}`);
      }
    }
  }
  atualizarPainelATS();
}

// ==================== PIX DOAÇÃO ====================
function abrirModalPix() {
  const m = document.getElementById('modal-pix');
  if (m) m.classList.add('show');
}

function fecharModalPix() {
  const m = document.getElementById('modal-pix');
  if (m) m.classList.remove('show');
}

function copiarChavePix() {
  const input = document.getElementById('pix-chave');
  if (!input) return;
  input.select();
  input.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(input.value).then(() => {
    mostrarToast('✅ Chave Copiada! Obrigado!');
  }).catch(() => {
    mostrarToast('❌ Erro ao copiar chave.');
  });
}
