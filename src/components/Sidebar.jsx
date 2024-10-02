import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import HeaderItens from '../components/HeaderItens';

const Sidebar = () => {
  return (

    
    <div>
        <div className="sidebar">
             <HeaderItens />
        </div>

    </div>
  );
};

export default Sidebar;
