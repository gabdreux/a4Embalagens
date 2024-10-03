import React from 'react';
import ProposalInputs from '../components/ProposalInputs';
import ProposalView from '../components/ProposalView';
import GenerateDocButton from './generateDocButton';

import CreateProductInputs from './CreateProduct';

const CreateProposal = () => {
  return (
    <div>
      <ProposalInputs />
      <GenerateDocButton buttonText="Visualizar" />
      <GenerateDocButton buttonText="Baixar" />
      {/* <CreateProductInputs /> */}
      <ProposalView />
    </div>
  );
};


export default CreateProposal;
