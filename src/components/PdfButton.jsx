import React from 'react';
import html2pdf from 'html2pdf.js';

const PdfButton = ({ buttonText }) => {

  const handleGeneratePDF = () => {
    const content = document.body; // Ajuste conforme necessário

    const options = {
      margin: 1,
      filename: 'pagina.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (buttonText === "Visualizar PDF") {
      // Abre o PDF em uma nova aba
      html2pdf().set(options).from(content).toPdf().get('pdf').then(function (pdf) {
        const url = pdf.output('bloburl');
        window.open(url);
      });
    } else {
      // Baixa o PDF diretamente
      html2pdf().set(options).from(content).save();
    }
  };

  return (
    <button onClick={handleGeneratePDF}>
      {buttonText}
    </button>
  );
};

export default PdfButton;
