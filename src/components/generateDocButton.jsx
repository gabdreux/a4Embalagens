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
  const outrosItens = inputValues.outrosItens || "";
  const modalidade = inputValues.modalidade || "";

  const currentDate = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  
  const formatModalidade = (modalidade) => {
    switch (modalidade) {
      case 'economico':
        return 'Econômico';
      case 'pedido-minimo':
        return 'Pedido mínimo';
      default:
        return modalidade; // Retorna o valor original se não houver formatação
    }
  };
  

  const generateTableHTML = () => {

    const totalItens = proposals.length;
    const quantidadeTotal = proposals.reduce((total, proposal) => total + proposal.quantidade, 0);
    const valorTotal =  proposals.reduce((acc, proposal) => acc + parseFloat(proposal.valor || 0), 0).toFixed(2);
  
    const rows = proposals.map((proposal) => `
      <tr>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.index}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.medida}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${formatModalidade(proposal.modalidade)}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.quantidade}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.precoUn}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.modelo}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.material}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.impressao}</td>
        <td style="border: 1px solid black; padding: 5px; font-size: 12px">${proposal.valor}</td>
      </tr>
  `).join('');
  

    return `

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
                <h4 style="margin: 0;">Cliente</h4>
                <p style="margin: 2px 0;">${nomeCliente}</p>
            </div>

            <div>      
                <p style="margin: 2px 0;">${currentDate}</p>
            </div>
        </div>  


        <table style="width: 100%; max-width: 100%; border-collapse: collapse; border: 1px solid black; table-layout: fixed;">
          <thead style="font-size: 10px;">
            <tr>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 4%;">Nº</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 15%;">MEDIDA</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 15%;">MODALIDADE</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 8%;">QTD.</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 10%;">PREÇO UN</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 10%;">MODELO</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 15%;">MATERIAL</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 13%;">IMPRESSÃO</th>
              <th style="padding: 20px; text-align: center; border: 1px solid black; width: 10%;">VALOR</th>
            </tr>
          </thead>
          <tbody style="text-align: center;">
            ${rows}
          </tbody>
        </table>
            
      </div>


      
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div>
          <h4>Total de itens: <span style="font-weight: 400;">${totalItens}</span></h4>
          <h4>Quantidade total: <span style="font-weight: 400;">${quantidadeTotal}</span></h4>
        </div>
        <h4>Valor total: <span style="font-weight: 400;">R$ ${valorTotal}</span></h4>
      </div>

    
    <div style="margin-top: 10px;">
      <h4 style="margin-bottom: 10px">Outros Itens:</h4>
      <div style="height: 150px; border: solid; border-width: 1px;">
      <p style="font-weight: 400; white-space: pre-wrap;">${outrosItens}</p>
    </div>


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
        
        


    `;
  };

  const handleGeneratePDF = () => {
    const content = generateTableHTML();

    const options = {
      margin: 0.2,
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
