import React from 'react';
import html2pdf from 'html2pdf.js';

const PdfButton = () => {

  const handleGeneratePDF = () => {
    // Seleciona o conteúdo da página que será convertido em PDF
    const content = document.body; // Você pode ajustar para pegar apenas uma parte específica da página

    // Configurações para gerar o PDF
    const options = {
      margin: 1,
      filename: 'pagina.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Gera o PDF e abre em uma nova aba
    html2pdf().set(options).from(content).toPdf().get('pdf').then(function (pdf) {
      const url = pdf.output('bloburl'); // Obtém a URL do PDF
      window.open(url); // Abre em uma nova aba
    });
  };

  return (
    <button onClick={handleGeneratePDF}>
      Visualizar PDF
    </button>
  );
};

export default PdfButton;
