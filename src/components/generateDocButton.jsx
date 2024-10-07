import React from 'react';
import { useProposalContext } from '../context/ProposalContext';
import { useInputContext } from '../context/InputsContext';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import '../styles/Styles.css';
import logo from '../assets/imgs/LOGO A4 Embalagens .png';

const GenerateDocButton = ({ buttonText }) => {
  const { proposals } = useProposalContext();
  const { inputValues } = useInputContext();

  const comprimento = parseFloat(inputValues.comprimento || 0);
  const altura = parseFloat(inputValues.altura || 0);
  const largura = parseFloat(inputValues.largura || 0);
  const nomeCliente = inputValues.nomeCliente || "Nome do Cliente";

  const currentDate = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  
  

  const generateTableHTML = () => {
    const rows = proposals.map((proposal) => `
      <tr>
        <td style="border: 1px solid black; padding: 5px;">${proposal.index}</td>
        <td style="border: 1px solid black; padding: 5px;">${proposal.material}</td>
        <td style="border: 1px solid black; padding: 5px;">${proposal.quantidade}</td>
        <td style="border: 1px solid black; padding: 5px;">${proposal.precoUn}</td>
        <td style="border: 1px solid black; padding: 5px;">${proposal.valor}</td>
      </tr>
  `).join('');
  

    return `

    <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px;">



      <div style=" display: flex; justify-content: space-between; align-items: start">
        <img src="${logo}" alt="Logo" style="width: 160px; height: auto"/>
        <div style="text-align: right;">
          <p style="margin: 0; font-size:12px">A4 EMBALAGENS E E-COMMERCE LTDA</p>
          <p style="margin: 0; font-size:12px">55.131.707/0001-29</p>
          <p style="margin: 0; font-size:12px">RUA TUCUMÃ, 538</p>
          <p style="margin: 0; font-size:12px">EUCALIPTOS, Fazenda Rio Grande - PR</p>
          <p style="margin: 0; font-size:12px">83.820-200</p>
          <p style="margin: 0; font-size:12px">91072097-08</p>
        </div>
      </div>



      <div style="display: flex; flex-direction: column; gap: 10px">


        <div style="display: flex; justify-content: space-between; align-items: start;">  
            <div>      
                <h4 style="margin: 0;">Dimensões</h4>
                <p style="font-size: 14px; margin: 2px 0;">Comprimento: ${comprimento}</p>
                <p style="font-size: 14px; margin: 2px 0;">Altura: ${altura}</p>
                <p style="font-size: 14px; margin: 2px 0;">Largura: ${largura}</p>
            </div>
            
            <div>      
                <h4 style="margin: 0;">Cliente</h4>
                <p style="margin: 2px 0;">${nomeCliente}</p>
            </div>

            <div>      
                <p style="margin: 2px 0;">${currentDate}</p>
            </div>
        </div>  




          <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
            <thead style="font-size: 14px; padding-bottom: 20px; margin-bottom: 20px !important;">
              <tr>
                <th style="padding: 20px; text-align: center; border: 1px solid black;">Nº</th>
                <th style="padding: 20px; text-align: center; border: 1px solid black;">MATERIAL</th>
                <th style="padding: 20px; text-align: center; border: 1px solid black;">QUANTIDADE</th>
                <th style="padding: 20px; text-align: center; border: 1px solid black;">PREÇO POR UNIDADE</th>
                <th style="padding: 20px; text-align: center; border: 1px solid black;">Valor</th>
              </tr>
            </thead>
            <tbody style="text-align: center;">
              ${rows}
            </tbody>
          </table>




        <div style="font-size: 12px;">
                <h3>Observações</h3>
                <p>Validade deste orçamento: 15 dias</p>
                <ol style={{ paddingLeft: '20px' }}>
                  <li>
                    Considerando nossas características de produção, o pedido poderá ser atendido com até 10% inferior ou superior a quantidade solicitada.
                  </li>
                  <li>
                    A A4 Embalagens garante as características físicas de seus produtos pelo prazo de 03 (três) meses, a partir da data de Emissão da NF, desde que observadas as recomendações abaixo:
                    <ul style={{ paddingLeft: '20px' }}>
                      
                        a) Adoção dos devidos cuidados na movimentação, carregamento e transporte.
                          </br>

                        b) Estocagem em local coberto, livre da ação solar direta, de líquidos, vapores, umidade, influência de poeira e com temperatura de 23+ / -5° e umidade relativa do ar 50+/- 10%.

                              </br>                
                        c) Portaria 177 ANVISA: As embalagens fornecidas deverão ser usadas apenas como embalagens secundárias para o caso de acondicionamento de alimentos conforme previsto na portaria 177, de 04 de março de 1999. De posse desta informação, fica de inteira responsabilidade do usuário o acondicionamento de alimentos que tenham contato direto com estas embalagens, isentando o fornecedor de qualquer impasse decorrente de seu uso impróprio.
                    
                    </ul>
                  </li>
                </ol>
            </div>



      </div>



    </div>
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
