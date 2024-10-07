import React from 'react';
import { useProposalContext } from '../context/ProposalContext';

const PdfTable = () => {
  const { proposals } = useProposalContext();

  return (
    <div id="pdfContent" style={{ display: 'none' }}> {/* Conteúdo do PDF */}
      <h2>Propostas</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Nº</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Material</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Quantidade</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Preço Unitário</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map(proposal => (
            <tr key={proposal.number}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{proposal.number}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{proposal.material}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{proposal.quantity}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{proposal.pricePerUnit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PdfTable;
