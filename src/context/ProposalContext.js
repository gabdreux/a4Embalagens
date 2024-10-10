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


  const removeProposal = (index) => {
    setProposals((prevProposals) => prevProposals.filter((_, i) => i !== index));
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
