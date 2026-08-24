import html2pdf from 'html2pdf.js';

// Dimensões exatas de uma folha A4 em pixels (96 DPI)
const A4_WIDTH_PX = 794;   // 210mm @ 96dpi
const A4_HEIGHT_PX = 1123; // 297mm @ 96dpi

/**
 * Aplica estilos estritos e hardcoded no clone DOM para garantir que a renderização do PDF
 * seja rigorosamente idêntica no celular (iPhone/Android) e no computador (Desktop),
 * imune a media queries, detectores do Safari, temas dark mode ou variações de sistema.
 */
function applyStrictPdfStyles(clone: HTMLElement) {
    // 1. Container principal A4
    clone.style.width = `${A4_WIDTH_PX}px`;
    clone.style.minWidth = `${A4_WIDTH_PX}px`;
    clone.style.maxWidth = `${A4_WIDTH_PX}px`;
    clone.style.padding = '36px 44px';
    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';
    clone.style.background = '#ffffff';
    clone.style.color = '#000000';
    clone.style.fontFamily = "'Segoe UI', Arial, Helvetica, sans-serif";
    clone.style.fontSize = '10pt';
    clone.style.lineHeight = '1.4';
    clone.style.transform = 'none';
    clone.style.boxShadow = 'none';
    (clone.style as any).webkitTextSizeAdjust = '100%';

    // 2. Nome completo (.cv-name)
    const nameEl = clone.querySelector('.cv-name') as HTMLElement;
    if (nameEl) {
        nameEl.style.textAlign = 'center';
        nameEl.style.fontSize = '20pt';
        nameEl.style.fontWeight = '700';
        nameEl.style.color = '#1F3864';
        nameEl.style.marginBottom = '4px';
        nameEl.style.letterSpacing = '0.5px';
        nameEl.style.lineHeight = '1.2';
    }

    // 3. Linhas de contato e links (.cv-contact)
    const contacts = clone.querySelectorAll('.cv-contact');
    contacts.forEach(c => {
        const el = c as HTMLElement;
        el.style.textAlign = 'center';
        el.style.fontSize = '8.5pt';
        el.style.color = '#444444';
        el.style.marginBottom = '3px';
        el.style.lineHeight = '1.6';
        el.style.textDecoration = 'none';
    });

    // 4. Títulos de seções (.cv-section-title) com borda inferior azul hardcoded
    const sectionTitles = clone.querySelectorAll('.cv-section-title');
    sectionTitles.forEach(st => {
        const el = st as HTMLElement;
        el.style.fontSize = '9.5pt';
        el.style.fontWeight = '700';
        el.style.color = '#1F3864';
        el.style.textTransform = 'uppercase';
        el.style.letterSpacing = '0.8px';
        el.style.borderBottom = '2px solid #1F3864';
        el.style.paddingBottom = '2px';
        el.style.marginTop = '10px';
        el.style.marginBottom = '4px';
        el.style.display = 'block';
        el.style.width = '100%';
        el.style.boxSizing = 'border-box';
    });

    // 5. Cargos (.cv-job-title) e títulos de grau (.cv-edu-degree)
    const jobTitles = clone.querySelectorAll('.cv-job-title, .cv-edu-degree');
    jobTitles.forEach(jt => {
        const el = jt as HTMLElement;
        el.style.fontSize = '9.5pt';
        el.style.fontWeight = '700';
        el.style.color = '#111111';
        el.style.marginTop = '6px';
        el.style.marginBottom = '1px';
    });

    // 6. Meta dados (.cv-job-meta, .cv-edu-meta)
    const jobMetas = clone.querySelectorAll('.cv-job-meta, .cv-edu-meta');
    jobMetas.forEach(jm => {
        const el = jm as HTMLElement;
        el.style.fontSize = '8.5pt';
        el.style.color = '#555555';
        el.style.marginBottom = '3px';
        el.style.fontStyle = 'italic';
    });

    // 7. Resumo (.cv-summary)
    const summaries = clone.querySelectorAll('.cv-summary');
    summaries.forEach(s => {
        const el = s as HTMLElement;
        el.style.fontSize = '9pt';
        el.style.color = '#111111';
        el.style.lineHeight = '1.45';
        el.style.marginTop = '4px';
    });

    // 8. Listas (ul, li)
    const uls = clone.querySelectorAll('ul');
    uls.forEach(u => {
        const el = u as HTMLElement;
        el.style.margin = '0';
        el.style.paddingLeft = '18px';
    });

    const lis = clone.querySelectorAll('li');
    lis.forEach(l => {
        const el = l as HTMLElement;
        el.style.marginBottom = '1px';
        el.style.fontSize = '8.5pt';
        el.style.color = '#111111';
        el.style.lineHeight = '1.35';
    });

    // 9. Habilidades em colunas (.cv-skills-cols, .cv-skills-label)
    const skillsCols = clone.querySelectorAll('.cv-skills-cols');
    skillsCols.forEach(sc => {
        const el = sc as HTMLElement;
        el.style.display = 'grid';
        el.style.gridTemplateColumns = '1fr 1fr';
        el.style.gap = '0 16px';
        el.style.marginTop = '4px';
    });

    const skillsLabels = clone.querySelectorAll('.cv-skills-label');
    skillsLabels.forEach(sl => {
        const el = sl as HTMLElement;
        el.style.fontSize = '8.5pt';
        el.style.fontWeight = '700';
        el.style.color = '#111111';
        el.style.marginBottom = '2px';
    });

    // 10. Prevenção de links e sublinhados indesejados (ex: detectores do iOS Safari)
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(node => {
        const el = node as HTMLElement;
        el.style.textDecoration = 'none';
        if (el.tagName === 'A') {
            el.style.color = '#1F3864';
        }
    });
}

export const exportToPDF = async (elementId: string, filename: string) => {
    console.log(`Iniciando exportação PDF do elemento ${elementId}...`);

    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento ${elementId} não encontrado.`);
        return false;
    }

    // Aguardar o carregamento completo das fontes no navegador antes de capturar o canvas
    if (document.fonts && document.fonts.ready) {
        try {
            await document.fonts.ready;
        } catch (e) {
            console.warn('Erro ao aguardar carregamento de fontes:', e);
        }
    }

    // 1. Criar container invisível fora da tela com largura A4 fixa (794px)
    const container = document.createElement('div');
    container.id = 'cv-pdf-render-wrapper';
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = `${A4_WIDTH_PX}px`;
    container.style.minWidth = `${A4_WIDTH_PX}px`;
    container.style.maxWidth = `${A4_WIDTH_PX}px`;
    container.style.background = '#ffffff';
    container.style.zIndex = '-9999';
    container.style.pointerEvents = 'none';

    // 2. Clonar o elemento do currículo
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'cv-preview-pdf-clone';

    // 3. Aplicar estilos estritos de A4 e hardcoded hex no clone
    applyStrictPdfStyles(clone);

    container.appendChild(clone);
    document.body.appendChild(container);

    const opt = {
        margin: 0,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: A4_WIDTH_PX,
            windowHeight: A4_HEIGHT_PX,
            width: A4_WIDTH_PX,
            scrollX: 0,
            scrollY: 0,
            onclone: (_doc: Document, clonedDocEl: HTMLElement) => {
                const target = clonedDocEl.querySelector('#cv-preview-pdf-clone') as HTMLElement;
                if (target) {
                    applyStrictPdfStyles(target);
                }
            }
        },
        jsPDF: {
            unit: 'pt' as const,
            format: 'a4',
            orientation: 'portrait' as const,
            compress: true,
        },
        pagebreak: { mode: [] as string[] }
    };

    try {
        await html2pdf().set(opt).from(clone).save();
        console.log('PDF Exportado com sucesso via html2pdf!');
        return true;
    } catch (error) {
        console.error('Erro ao exportar PDF:', error);
        return false;
    } finally {
        if (document.body.contains(container)) {
            document.body.removeChild(container);
        }
    }
};
