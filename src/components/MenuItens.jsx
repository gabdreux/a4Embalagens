import React from 'react';
import { FaPlus, FaList, FaCog } from 'react-icons/fa';
import '../styles/Header.css';

const HeaderItens = () => {
  return (
    <nav className="header-menu">
      <ul className="budget-list">
        <li className="budget-item">
          <FaPlus className="icon" />
          <h5 className="budget-title">NOVO ORÇAMENTO</h5>
        </li>
        <li className="budget-item">
          <FaList className="icon" />
          <h5 className="budget-title">ORÇAMENTOS</h5>
        </li>
        <li className="budget-item">
          <FaCog className="icon" />
          <h5 className="budget-title">OPÇÕES</h5>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderItens;
