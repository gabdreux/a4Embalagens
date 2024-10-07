// GenerateDocButton.js
import React from 'react';
import { useProposalContext } from '../context/ProposalContext'; // Importa o contexto
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import '../styles/Styles.css';

const GenerateDocButton = ({ buttonText }) => {
  const { proposals } = useProposalContext(); // Acessa as propostas do contexto

  // Função para gerar HTML da tabela com base nas propostas
  const generateTableHTML = () => {
    const rows = proposals.map((proposal) => `
      <tr>
        <td>${proposal.index}</td>
        <td>${proposal.material}</td>
        <td>${proposal.quantidade}</td>
        <td>${proposal.precoUn}</td>
        <td>${proposal.valor}</td>
      </tr>
    `).join(''); // Cria linhas dinâmicas

    return `
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
    const content = generateTableHTML(); // Obtém o HTML da tabela

    const options = {
      margin: 0,
      filename: 'pagina.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    return html2pdf().set(options).from(content).output('blob'); // Gera o blob do PDF
  };

  const handleClick = async () => {
    const pdfBlob = await handleGeneratePDF(); // Chama a função para gerar o PDF

    // Ação dependendo do texto do botão
    if (buttonText === "Visualizar") {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl); // Abre o PDF em uma nova aba
    } else {
      saveAs(pdfBlob, 'pagina.pdf'); // Salva o PDF
    }
  };

  return (
    <button onClick={handleClick}>
      {buttonText} {/* Retorna apenas o botão */}
    </button>
  );
};

export default GenerateDocButton;
