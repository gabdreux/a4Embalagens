import React from 'react';
import { useProposalContext } from '../context/ProposalContext';
import { useInputContext } from '../context/InputsContext';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import '../styles/Styles.css';

const GenerateDocButton = ({ buttonText }) => {
  const { proposals } = useProposalContext();
  
  const { inputValues } = useInputContext();
  const comprimento = parseFloat(inputValues.comprimento || 0);
  const altura = parseFloat(inputValues.altura || 0);
  const largura = parseFloat(inputValues.largura || 0);


  const generateTableHTML = () => {
    const rows = proposals.map((proposal) => `
      <tr>
        <td>${proposal.index}</td>
        <td>${proposal.material}</td>
        <td>${proposal.quantidade}</td>
        <td>${proposal.precoUn}</td>
        <td>${proposal.valor}</td>
      </tr>
    `).join('');

    return `
    <div>
      <h3>Dimensões</h3>
      <p>Comprimento: ${comprimento}</p>
      <p>Altura: ${altura}</p>
      <p>Largura: ${largura}</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>MATERIAL</th>
          <th>QUANTIDADE</th>
          <th>PREÇO POR UNIDADE</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        ${rows} <!-- Insere as linhas dinâmicas -->
      </tbody>
    </table>
    `;
  };

  const handleGeneratePDF = () => {
    const content = generateTableHTML();

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
