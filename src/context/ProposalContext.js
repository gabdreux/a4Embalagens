import React, { createContext, useContext, useState } from 'react';


const ProposalContext = createContext();


export const ProposalProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);

  const addProposal = (proposal) => {
    setProposals((prevProposals) => [...prevProposals, proposal]);
    // console.log('Proposal added:', proposal);
  };

  const resetProposals = () => {
    setProposals([]);
    // console.log('Proposals reset.');
  };

  const removeProposal = (id) => {
    setProposals((prevProposals) => prevProposals.filter((proposal) => proposal.id !== id));
    // console.log('Proposal removed:', id);
  };

  return (
    <ProposalContext.Provider value={{ proposals, addProposal, resetProposals, removeProposal }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposalContext = () => {
  return useContext(ProposalContext);
};
