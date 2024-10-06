import React from 'react';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import '../styles/Styles.css';

const GenerateDocButton = ({ buttonText }) => {

  const handleGeneratePDF = () => {
    // const content = document.body;
    const content = document.getElementById('print');

    const options = {
      margin: 0,
      filename: 'pagina.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    return html2pdf().set(options).from(content).output('blob');
  };


  const handleClick = async () => {
    const pdfBlob = await handleGeneratePDF();
    

    if (buttonText === "Visualizar") {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);

    } else {
      saveAs(pdfBlob, 'pagina.pdf');
    }
  };

  return (
    <button onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default GenerateDocButton;