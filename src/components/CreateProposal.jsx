import React from 'react';
import ProposalInputs from '../components/ProposalInputs';
import ProposalView from '../components/ProposalView';
import GenerateDocButton from './generateDocButton';


const CreateProposal = () => {
  return (
    <div className='viewBox proposalBox'>
      <ProposalInputs />
      <ProposalView />
    </div>
  );
};


export default CreateProposal;
