import React from 'react';
import CreateProposal from '../components/CreateProposal';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <h1>Home</h1>
            <CreateProposal />
        </div>
    );
};

export default HomePage;
