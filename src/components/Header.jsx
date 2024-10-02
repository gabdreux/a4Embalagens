import React from 'react';
import { FaPlus, FaList, FaCog } from 'react-icons/fa';
import '../styles/Header.css';
import logo from '../assets/imgs/LOGO A4 Embalagens -Cortada.png';


const Header = () => {
  return (
    <header className="header">
      <div className="header-image">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="header-menu">
         <ul class="budget-list">
            <li class="budget-item">
                <FaPlus className="icon" />
                <h5 className="budget-title">NOVO ORÇAMENTO</h5>
            </li>
            <li class="budget-item">
                <FaList className="icon" />
                <h5 className="budget-title">ORÇAMENTOS</h5>
            </li>
            <li class="budget-item">
                <FaCog className="icon" />
                <h5 className="budget-title">OPÇÕES</h5>
            </li>
        </ul>

      </nav>
      <div className="header-icon">
        <button className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
