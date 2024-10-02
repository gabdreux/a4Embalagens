import React from 'react';
import ProposalInputs from '../components/ProposalInputs';
import ProductList from '../components/ProductsList';
import GenerateDocButton from './generateDocButton';
import FileUpload from './FileUpload';
import CreateProductInputs from './CreateProduct';

const CreateProposal = () => {
  return (
    <div>
      <ProposalInputs />
      <GenerateDocButton buttonText="Visualizar" />
      <GenerateDocButton buttonText="Baixar" />
      <CreateProductInputs />
      <ProductList />
    </div>
  );
};


export default CreateProposal;
