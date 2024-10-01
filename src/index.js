import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar o cliente de renderização
import App from './App';
import './styles/styles.css';

// Criando um root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizando o componente App
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
