import React, { useEffect } from 'react';
import CreateProposal from '../components/CreateProposal';
import Header from '../components/Header';
import { useInputContext } from '../context/InputsContext';
import UpdateOptionsInputs from '../components/Options';


const HomePage = () => {

    const { inputValues } = useInputContext(); // Uso do hook

    useEffect(() => {
        console.log('Valores dos Inputs:', inputValues);
    }, [inputValues]);

    return (
        <div>
            <Header />
            <h1>Home</h1>
            <UpdateOptionsInputs />
            <CreateProposal />
        </div>
    );
};

export default HomePage;
