// src/components/HeaderItens.js
import React from 'react';
import { FaPlus, FaList, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useView } from '../context/ViewContext'; // Importa o hook do contexto
import '../styles/Header.css';

const HeaderItens = () => {
  const { changeView } = useView(); // Acessa a função para mudar a visualização

  return (
    <nav>
      <ul className="budget-list">
        <li className="budget-item" onClick={() => changeView('CRIAR ORÇAMENTO')}>
          <FaPlus className="icon" />
          <h5 className="budget-title">CRIAR ORÇAMENTO</h5>
        </li>
        <li className="budget-item" onClick={() => changeView('ORÇAMENTOS')}>
          <FaList className="icon" />
          <h5 className="budget-title">ORÇAMENTOS</h5>
        </li>
        <li className="budget-item" onClick={() => changeView('CRIAR PRODUTO')}>
          <FaPlus className="icon" />
          <h5 className="budget-title">CRIAR PRODUTO</h5>
        </li>
        <li className="budget-item" onClick={() => changeView('PRODUTOS')}>
          <FaList className="icon" />
          <h5 className="budget-title">PRODUTOS</h5>
        </li>
        <li className="budget-item" onClick={() => changeView('OPÇÕES')}>
          <FaCog className="icon" />
          <h5 className="budget-title">OPÇÕES</h5>
        </li>
        <li className="budget-item logout">
          <FaSignOutAlt className="icon" />
          <h5 className="budget-title">Sair</h5>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderItens;
