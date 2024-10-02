import React from 'react';
import '../styles/Header.css';
import logo from '../assets/imgs/LOGO A4 Embalagens -Cortada.png';
import HeaderItens from '../components/MenuItens';


const Header = () => {
  return (
    <header className="header">

      <div className="header-image">
        <img src={logo} alt="Logo" />
      </div>

      < HeaderItens/>

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
