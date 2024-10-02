import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/imgs/LOGO A4 Embalagens -Cortada.png';
import HeaderItens from '../components/HeaderItens';
import Sidebar from '../components/Sidebar';


const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <header className="header">

      <div className="header-image">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="header-menu">
        < HeaderItens/>
      </nav>
      {sidebarVisible && <Sidebar />}
      <div className="header-icon">
        <button className="menu-icon" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
    </header>
  );
};

export default Header;
