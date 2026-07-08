import html2pdf from 'html2pdf.js';

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
            letterRendering: true,
            scrollY: 0,
            scrollX: 0,
            windowWidth: 794,
            onclone: (documentClone: Document) => {
                const el = documentClone.getElementById(elementId);
                if (el) {
                    el.style.boxShadow = 'none';
                    el.style.margin = '0';
                    el.style.transform = 'none';
                }
            }
        },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
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

