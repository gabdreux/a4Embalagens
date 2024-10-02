import React, { useEffect } from 'react';
import CreateProposal from '../components/CreateProposal';
import Header from '../components/Header';
import SaveProposalButton from '../components/SaveProposal';
import { useInputContext } from '../context/InputsContext';


const HomePage = () => {

    const { inputValues } = useInputContext(); // Uso do hook

    useEffect(() => {
        console.log('Valores dos Inputs:', inputValues);
    }, [inputValues]);

    return (
        <div>
            <Header />
            <h1>Home</h1>
            <CreateProposal />
            <SaveProposalButton />
        </div>
    );
};

export default HomePage;
