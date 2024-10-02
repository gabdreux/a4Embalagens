import React from 'react';
import CreateProposal from '../components/CreateProposal';
import Header from '../components/Header';

const HomePage = () => {
    return (
        <div>
            <Header />
            <h1>Home</h1>
            <CreateProposal />
        </div>
    );
};

export default HomePage;
