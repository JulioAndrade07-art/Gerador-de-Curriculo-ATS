import html2pdf from 'html2pdf.js';

// Dimensões exatas de uma folha A4 em pontos (72 DPI) e pixels (96 DPI)
const A4_WIDTH_PX = 794;   // 210mm @ 96dpi
const A4_HEIGHT_PX = 1123; // 297mm @ 96dpi

export const exportToPDF = async (elementId: string, filename: string) => {
    console.log(`Iniciando exportação PDF do elemento ${elementId}...`);

    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento ${elementId} não encontrado.`);
        return false;
    }

    const opt = {
        margin: 0,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg' as const, quality: 1.0 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            // Força exatamente a largura A4 independentemente do viewport do device
            windowWidth: A4_WIDTH_PX,
            windowHeight: A4_HEIGHT_PX,
            width: A4_WIDTH_PX,
            // Sem scroll para não capturar posições erradas em mobile
            scrollX: 0,
            scrollY: 0,
            onclone: (_doc: Document, clonedEl: HTMLElement) => {
                // Remove sombras, escalas e margens que existem só na tela
                clonedEl.style.boxShadow = 'none';
                clonedEl.style.margin = '0';
                clonedEl.style.padding = '0';
                clonedEl.style.transform = 'none';
                clonedEl.style.transformOrigin = 'top left';
                // Força dimensões fixas A4 no clone para garantir consistência
                clonedEl.style.width = `${A4_WIDTH_PX}px`;
                clonedEl.style.minWidth = `${A4_WIDTH_PX}px`;
                clonedEl.style.maxWidth = `${A4_WIDTH_PX}px`;
                // Remove overflow para evitar página em branco
                clonedEl.style.overflow = 'visible';
                clonedEl.style.pageBreakAfter = 'avoid';
                clonedEl.style.breakAfter = 'avoid';
            }
        },
        jsPDF: {
            unit: 'pt' as const,
            format: 'a4',
            orientation: 'portrait' as const,
            compress: true,
        },
        // Desabilitamos page-break automático para evitar página em branco
        pagebreak: { mode: [] as string[] }
    };

    try {
        await html2pdf().set(opt).from(element).save();
        console.log('PDF Exportado com sucesso via html2pdf!');
        return true;
    } catch (error) {
        console.error('Erro ao exportar PDF:', error);
        return false;
    }
};
