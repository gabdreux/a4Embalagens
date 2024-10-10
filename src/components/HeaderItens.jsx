import React, { useState, useEffect } from 'react';
import { FaPlus, FaList, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useView } from '../context/ViewContext';
import '../styles/Header.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useInputContext } from '../context/InputsContext';
import { useProposalContext } from '../context/ProposalContext';


const HeaderItens = () => {
  const { changeView } = useView();
  const navigate = useNavigate();
  const { resetInputs } = useInputContext();
  const [hasAccess, setHasAccess] = useState(false);

  const { resetProposals } = useProposalContext();

  useEffect(() => {
    const storedKey = localStorage.getItem('role');
    setHasAccess(!!storedKey);
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);

      console.log('Usuário deslogado com sucesso');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };


  const handleCreateBudget = () => {
    resetInputs();
    resetProposals();
    changeView('CRIAR ORÇAMENTO');
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
        {hasAccess && (
          <li className="budget-item" onClick={() => changeView('OPÇÕES')}>
            <FaCog className="icon" />
            <h5 className="budget-title">OPÇÕES</h5>
          </li>
        )}
        <li className="budget-item logout" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <h5 className="budget-title">Sair</h5>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderItens;
