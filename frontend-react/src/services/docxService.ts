export const exportToDocx = async (htmlContent: string, filename: string) => {
    console.log(`Iniciando exportação DOCX do arquivo ${filename}...`);

    const styles = `
        <style>
            body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; color: #000; margin: 0; padding: 0; }
            .cv-name { text-align: center; font-size: 20pt; font-weight: bold; color: #1F3864; margin-bottom: 4px; }
            .cv-contact { text-align: center; font-size: 8.5pt; color: #444; margin-bottom: 3px; }
            .cv-section-title { font-size: 9.5pt; font-weight: bold; color: #1F3864; text-transform: uppercase; border-bottom: 2px solid #1F3864; margin-top: 10px; margin-bottom: 4px; padding-bottom: 2px; }
            .cv-job-title { font-size: 9.5pt; font-weight: bold; color: #111; margin-top: 6px; }
            .cv-job-meta { font-size: 8.5pt; color: #555; margin-bottom: 3px; font-style: italic; }
            .cv-edu-degree { font-size: 9pt; font-weight: bold; margin-top: 4px; }
            .cv-edu-meta { font-size: 8.5pt; color: #555; margin-bottom: 2px; }
            .cv-summary { font-size: 9pt; color: #111; margin-top: 4px; line-height: 1.4; }
            ul { margin-top: 5px; margin-bottom: 5px; padding-left: 20px; }
            li { font-size: 8.5pt; color: #111; margin-bottom: 1px; }
            .cv-skills-cols { display: table; width: 100%; margin-top: 4px; }
            .cv-skills-cols > div { display: table-cell; width: 50%; vertical-align: top; }
            .cv-skills-label { font-size: 8.5pt; font-weight: bold; margin-bottom: 2px; color: #111; }
            a { color: #1F3864; text-decoration: none; }
        </style>
    `;

    const docHTML = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  ${styles}
</head>
<body>
  <div style="width:100%;max-width:800px;margin:auto;">
    ${htmlContent}
  </div>
</body>
</html>`;

    try {
        // Importação dinâmica para evitar crash do Vite com módulos CommonJS
        const HTMLtoDOCX = (await import('html-to-docx')).default;

        const blob = await HTMLtoDOCX(docHTML, null, {
            table: { row: { cantSplit: true } },
            footer: false,
            pageNumber: false,
            font: 'Calibri',
            fontSize: 22,
            margins: { top: 720, right: 720, bottom: 720, left: 720 },
        });

        const url = URL.createObjectURL(blob as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('DOCX exportado com sucesso!');
        return true;
    } catch (error) {
        console.error('Erro ao exportar DOCX:', error);

        // Fallback seguro: download como .doc HTML mesmo caso html-to-docx falhe
        const blob = new Blob(['\ufeff', docHTML], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
    }
};
