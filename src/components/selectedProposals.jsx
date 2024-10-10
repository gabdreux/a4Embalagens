import React from 'react';
import { useProposalContext } from '../context/ProposalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const SelectedProposals = () => {
    const { proposals, removeProposal } = useProposalContext();

  return (
    <>
      <h2>ITENS SELECIONADOS</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell proposalView"><span>MEDIDA</span></div>
            <div className="table-cell proposalView"><span>MODALIDADE</span></div>
            <div className="table-cell proposalView"><span>QUANTIDADE</span></div>
            <div className="table-cell proposalView"><span>PREÇO UN</span></div>
            <div className="table-cell proposalView"><span>MODELO</span></div>
            <div className="table-cell proposalView"><span>MATERIAL</span></div>
            <div className="table-cell proposalView"><span>IMPRESSÃO</span></div>
            <div className="table-cell proposalView"><span>VALOR</span></div>
            <div className="table-cell proposalView"><span>REMOVER</span></div>
          </div>
        </div>
        <div className="table-body">
          {proposals.map((proposal, index) => (
            <div key={index} className="table-row">
              <div className="table-cell proposalView">{proposal.medida}</div>
              <div className="table-cell proposalView">{proposal.modalidade}</div>
              <div className="table-cell proposalView">{proposal.quantidade}</div>
              <div className="table-cell proposalView">{proposal.precoUn}</div>
              <div className="table-cell proposalView">{proposal.modelo}</div>
              <div className="table-cell proposalView">{proposal.material}</div>
              <div className="table-cell proposalView">{proposal.impressao ? 'Sim' : 'Não'}</div>
              <div className="table-cell proposalView">{proposal.valor}</div>
              <div className="table-cell proposalView">
              <FontAwesomeIcon 
                  icon={faTimes} 
                  onClick={() => removeProposal(index)}
                  className="delete-icon"
                  style={{ color: 'red' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectedProposals;
