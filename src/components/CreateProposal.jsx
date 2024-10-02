import React from 'react';
import ProposalInputs from '../components/ProposalInputs';
import ProductList from '../components/ProductsList';
import PdfButton from '../components/PdfButton';

const CreateProposal = () => {
  return (
    <div>
      <ProposalInputs />
        <PdfButton />
      <ProductList />
    </div>
  );
};


export default CreateProposal;
