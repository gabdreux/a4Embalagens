// src/components/HeaderItens.js
import React from 'react';
import { FaPlus, FaList, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useView } from '../context/ViewContext';
import '../styles/Header.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useInputContext } from '../context/InputsContext';


const HeaderItens = () => {
  const { changeView } = useView(); // Acessa a função para mudar a visualização
  const navigate = useNavigate();
  const { resetInputs } = useInputContext();


  const handleLogout = async () => {
    try {
      await signOut(auth);

      console.log('Usuário deslogado com sucesso');
      navigate('/');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };


  const handleCreateBudget = () => {
    resetInputs(); // Resetar os inputs ao criar orçamento
    changeView('CRIAR ORÇAMENTO'); // Mudar a visualização
  };

  return (
    <nav>
      <ul className="budget-list">
        <li className="budget-item" onClick={handleCreateBudget}>
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
        <li className="budget-item logout" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <h5 className="budget-title">Sair</h5>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderItens;
