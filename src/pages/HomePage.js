import React, { useEffect } from 'react';
import CreateProposal from '../components/CreateProposal';
import Header from '../components/Header';
import { useInputContext } from '../context/InputsContext';
import UpdateOptionsInputs from '../components/Options';
import ProductsList from '../components/ProductsList';
import ProposalList from '../components/ProposalList';
import { useView } from '../context/ViewContext'; // Importar o contexto de visualização
import CreateProductInputs from '../components/CreateProduct';

const HomePage = () => {
    const { inputValues } = useInputContext(); // Uso do hook para inputs
    const { activeView } = useView(); // Uso do hook para a visualização ativa

    useEffect(() => {
        console.log('Valores dos Inputs:', inputValues);
    }, [inputValues]);

    return (
        <div>
            <Header />
            
            <div className='content'>

            {activeView === 'CRIAR ORÇAMENTO' && <CreateProposal />}

            {activeView === 'ORÇAMENTOS' && <ProposalList />}
            
            {activeView === 'CRIAR PRODUTO' && <CreateProductInputs />}

            {activeView === 'PRODUTOS' && <ProductsList />}

            {activeView === 'OPÇÕES' && <UpdateOptionsInputs />}

            </div>

        </div>
    );
};

export default HomePage;
