import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import '../styles/Lists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useInputContext } from '../context/InputsContext';
import { useView } from '../context/ViewContext';
import { useProposalContext } from '../context/ProposalContext';



const ProposalList = () => {
  const [data, setData] = useState([]);
  const { handleInputChange } = useInputContext();
  const { changeView } = useView();

  const { addProposal, resetProposals } = useProposalContext(); 


  useEffect(() => {
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
  }, []);



  const handleOpenClick = (proposal) => {

    resetProposals();
    proposal.propostas.forEach((p) => addProposal(p));

    Object.keys(proposal).forEach(key => {
      handleInputChange(key, proposal[key]);
    });
    changeView('CRIAR ORÇAMENTO');
  };



  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja deletar este orçamento?');
    
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'orcamentos', id));
      console.log(`Orçamento ${id} deletado com sucesso`);
      alert('Orçamento deletado com sucesso!');

      setData(prevData => prevData.filter(proposal => proposal.id !== id));
    
    } catch (error) {
      console.error('Erro ao deletar o orçamento:', error);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (

    <div>
    
    <div className="center">
       <h2 className="viewTitle">ORÇAMENTOS</h2>
    </div>

    <div className="listWrapper">
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>Nº</span></div>
            <div className="table-cell"><span>CLIENTE</span></div>
            <div className="table-cell"><span>CNPJ</span></div>
            <div className="table-cell"><span>DATA</span></div>
            <div className="table-cell"><span>CONTATO</span></div>
            <div className="table-cell"><span>ENDEREÇO</span></div>               
            <div className="table-cell"><span>ABRIR</span></div>
            <div className="table-cell"><span>DELETAR</span></div>
          </div>
        </div>
        <div className="table-body">
          {data.map((proposal) => (
            <div key={proposal.id} className="table-row">
              <div className="table-cell">{proposal['numero']}</div>
              <div className="table-cell">{proposal['nomeCliente']}</div>
              <div className="table-cell">{proposal['cnpj']}</div>
              <div className="table-cell">{formatDate(proposal['dataCriacao'])}</div>
              <div className="table-cell">{proposal['contato']}</div>
              <div className="table-cell">{proposal['endereco']}</div>
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
    </div>
  );
};

export default ProposalList;
