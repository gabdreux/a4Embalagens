import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importa a configuração do Firebase
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa funções do Firestore
import '../styles/Lists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

const ProposalList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para buscar dados da coleção "produtos"
    const fetchProposalData = async () => {
      try {
        // Consulta para produtos da categoria "pedido mínimo"
        const proposalQuery = query(collection(db, 'orcamentos'));
        const snapshot = await getDocs(proposalQuery);
        const orcamentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(orcamentos);


      } catch (error) {
        console.error('Erro ao carregar produtos do Firestore:', error);
      }
    };

    fetchProposalData();
  }, []);

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
              <div className="table-cell"><FontAwesomeIcon icon={faArrowUpRightFromSquare}/></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProposalList;
