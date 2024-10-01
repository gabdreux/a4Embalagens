import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';


function App() {
    return (
        <Router>
            <div>
                <Routes> 
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} /> 
                </Routes>
            </div>
        </Router>

    );
}

export default App;
