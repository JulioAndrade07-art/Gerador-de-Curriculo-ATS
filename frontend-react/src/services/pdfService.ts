import html2pdf from 'html2pdf.js';

// Dimensões exatas de uma folha A4 em pixels (96 DPI)
const A4_WIDTH_PX = 794;   // 210mm @ 96dpi
const A4_HEIGHT_PX = 1123; // 297mm @ 96dpi

export const exportToPDF = async (elementId: string, filename: string) => {
    console.log(`Iniciando exportação PDF do elemento ${elementId}...`);

    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento ${elementId} não encontrado.`);
        return false;
    }

    // 1. Criar container invisível fora da tela com largura desktop fixa (794px)
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

    // 2. Clonar o currículo para isolar totalmente de estilos responsivos do celular
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'cv-preview-pdf-clone';

    // 3. Forçar estilos A4 Desktop rigorosos no elemento clonado
    clone.style.width = `${A4_WIDTH_PX}px`;
    clone.style.minWidth = `${A4_WIDTH_PX}px`;
    clone.style.maxWidth = `${A4_WIDTH_PX}px`;
    clone.style.padding = '36px 44px';
    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';
    clone.style.background = '#ffffff';
    clone.style.color = '#000000';
    clone.style.transform = 'none';
    clone.style.boxShadow = 'none';

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
                    target.style.width = `${A4_WIDTH_PX}px`;
                    target.style.minWidth = `${A4_WIDTH_PX}px`;
                    target.style.maxWidth = `${A4_WIDTH_PX}px`;
                    target.style.transform = 'none';
                    target.style.margin = '0';
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
        // Remover container temporário da DOM
        if (document.body.contains(container)) {
            document.body.removeChild(container);
        }
    }
};
