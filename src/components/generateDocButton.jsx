import React from 'react';
import { useProposalContext } from '../context/ProposalContext';
import { useInputContext } from '../context/InputsContext';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import '../styles/Styles.css';
import logo from '../assets/imgs/LOGO A4 Embalagens -Cortada.png';

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
    <div style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
      <img src="${logo}" alt="Logo" style="width: 130px;"/>
      <div style="text-align: right;">
        <p>A4 EMBALAGENS E E-COMMERCE LTDA</p>
        <p>55.131.707/0001-29</p>
        <p>RUA TUCUMÃ, 538</p>
        <p>EUCALIPTOS, Fazenda Rio Grande - PR</p>
        <p>83.820-200</p>
        <p>91072097-08</p>
      </div>
    </div>
    <div style="padding: 20px 0;"> <!-- Adiciona padding ao conteúdo -->
      <h3>Dimensões</h3>
      <p>Comprimento: ${comprimento}</p>
      <p>Altura: ${altura}</p>
      <p>Largura: ${largura}</p>
    </div>
    <table style="width: 100%; border-collapse: collapse;">
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
