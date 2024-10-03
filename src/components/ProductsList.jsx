import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import '../styles/Lists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const ProductsList = () => {
  const [minData, setMinData] = useState([]);
  const [ecoData, setEcoData] = useState([]);

  useEffect(() => {
    // Função para buscar dados da coleção "produtos"
    const fetchProductData = async () => {
      try {
        // Consulta para produtos da categoria "pedido mínimo"
        const minQuery = query(collection(db, 'produtos'), where('categoria', '==', 'pedido-minimo'));
        const minSnapshot = await getDocs(minQuery);
        const minProducts = minSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMinData(minProducts);

        // Consulta para produtos da categoria "econômico"
        const ecoQuery = query(collection(db, 'produtos'), where('categoria', '==', 'economico'));
        const ecoSnapshot = await getDocs(ecoQuery);
        const ecoProducts = ecoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEcoData(ecoProducts);

      } catch (error) {
        console.error('Erro ao carregar produtos do Firestore:', error);
      }
    };

    fetchProductData();
  }, []);



    // Função para deletar um produto
  const handleDelete = async (id, category) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja deletar este produto?');
    
    if (!confirmDelete) {
      return; // Se o usuário cancelar, sai da função
    }

    try {
      await deleteDoc(doc(db, 'produtos', id)); // Deleta o documento do Firestore
      console.log(`Produto ${id} deletado com sucesso`);

      // Atualiza a lista após a exclusão
      if (category === 'pedido-minimo') {
        setMinData(minData.filter(product => product.id !== id));
      } else if (category === 'economico') {
        setEcoData(ecoData.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
    }
  };

  return (
    <div className="listWrapper">
      {/* Tabela MÍNIMO */}
      <h2>MÍNIMO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>COLUNA</span></div>
            <div className="table-cell"><span>GRAMATURA</span></div>
            <div className="table-cell"><span>VALOR M²</span></div>
            <div className="table-cell"><span>INFOS</span></div>
            <div className="table-cell"><span>DELETAR</span></div>
          </div>
        </div>
        <div className="table-body">
          {minData.map((product) => (
            <div key={product.id} className="table-row">
              <div className="table-cell">{product['material']}</div>
              <div className="table-cell">{product['fornecedor']}</div>
              <div className="table-cell">{product['coluna']}</div>
              <div className="table-cell">{product['gramagem']}</div>
              <div className="table-cell">{product['precoM2']}</div>
              <div className="table-cell">{product['infos']}</div>
              <div className="table-cell">
                <FontAwesomeIcon 
                  icon={faTrash} 
                  onClick={() => handleDelete(product.id, 'pedido-minimo')} 
                  className="delete-icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela ECONÔMICO */}
      <h2>ECONÔMICO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>COLUNA</span></div>
            <div className="table-cell"><span>GRAMATURA</span></div>
            <div className="table-cell"><span>VALOR M²</span></div>
            <div className="table-cell"><span>INFOS</span></div>
            <div className="table-cell"><span>DELETAR</span></div>
          </div>
        </div>
        <div className="table-body">
          {ecoData.map((product) => (
            <div key={product.id} className="table-row">
              <div className="table-cell">{product['material']}</div>
              <div className="table-cell">{product['fornecedor']}</div>
              <div className="table-cell">{product['coluna']}</div>
              <div className="table-cell">{product['gramagem']}</div>
              <div className="table-cell">{product['precoM2']}</div>
              <div className="table-cell">{product['infos']}</div>
              <div className="table-cell">
                <FontAwesomeIcon 
                  icon={faTrash} 
                  onClick={() => handleDelete(product.id, 'economico')} 
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

export default ProductsList;
