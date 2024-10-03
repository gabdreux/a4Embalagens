import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importa a configuração do Firebase
import { collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore'; // Importa funções do Firestore
import '../styles/Lists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useInputContext } from '../context/InputsContext';
import { useView } from '../context/ViewContext';

const ProposalList = () => {
  const [data, setData] = useState([]);
  const { handleInputChange } = useInputContext();
  const { changeView } = useView();

  useEffect(() => {
    // Função para buscar dados da coleção "orcamentos"
    const fetchProposalData = async () => {
      try {
        const proposalQuery = query(collection(db, 'orcamentos'));
        const snapshot = await getDocs(proposalQuery);
        const orcamentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(orcamentos);
      } catch (error) {
        console.error('Erro ao carregar orçamentos do Firestore:', error);
      }
    };

    fetchProposalData();
  }, []); // Executa uma vez ao montar o componente

  const handleOpenClick = (proposal) => {
    Object.keys(proposal).forEach(key => {
      handleInputChange(key, proposal[key]);
    });
    changeView('CRIAR ORÇAMENTO');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja deletar este orçamento?');
    
    if (!confirmDelete) {
      return; // Se o usuário cancelar, sai da função
    }

    try {
      await deleteDoc(doc(db, 'orcamentos', id)); // Deleta o documento do Firestore
      console.log(`Orçamento ${id} deletado com sucesso`);
      alert('Orçamento deletado com sucesso!');

      // Atualiza a lista após a exclusão
      setData(prevData => prevData.filter(proposal => proposal.id !== id));
    
    } catch (error) {
      console.error('Erro ao deletar o orçamento:', error);
    }
  };

  return (
    <div className="listWrapper">
      <h2>ORÇAMENTOS</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>CLIENTE</span></div>
            <div className="table-cell"><span>DATA</span></div>
            <div className="table-cell"><span>PRODUTO</span></div>
            <div className="table-cell"><span>MARGEM</span></div>
            <div className="table-cell"><span>SIMPLES</span></div>
            <div className="table-cell"><span>ABRIR</span></div>
            <div className="table-cell"><span>DELETAR</span></div>
          </div>
        </div>
        <div className="table-body">
          {data.map((proposal) => (
            <div key={proposal.id} className="table-row">
              <div className="table-cell">{proposal['nomeCliente']}</div>
              <div className="table-cell">{proposal['dataCriacao']}</div>
              <div className="table-cell">{proposal['nomeProduto']}</div>
              <div className="table-cell">{proposal['margem']}</div>
              <div className="table-cell">{proposal['simples']}</div>
              <div className="table-cell">
                <FontAwesomeIcon 
                  icon={faArrowUpRightFromSquare} 
                  onClick={() => handleOpenClick(proposal)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="table-cell">
                <FontAwesomeIcon 
                  icon={faTrash} 
                  onClick={() => handleDelete(proposal.id)} 
                  className="delete-icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProposalList;
