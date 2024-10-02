import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importa a configuração do Firebase
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa funções do Firestore
import '../styles/productList.css';

const ProductList = () => {
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

  return (
    <div className="productListWrapper">
      {/* Tabela MÍNIMO */}
      <h2>MÍNIMO</h2>
      <div className="product-list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>CUSTO (R$)</span></div>
          </div>
        </div>
        <div className="table-body">
          {minData.map((product) => (
            <div key={product.id} className="table-row">
              <div className="table-cell">{product['fornecedor']}</div>
              <div className="table-cell">{product['material']}</div>
              <div className="table-cell">{product['precoM2']}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela ECONÔMICO */}
      <h2>ECONÔMICO</h2>
      <div className="product-list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>CUSTO (R$)</span></div>
          </div>
        </div>
        <div className="table-body">
          {ecoData.map((product) => (
            <div key={product.id} className="table-row">
              <div className="table-cell">{product['fornecedor']}</div>
              <div className="table-cell">{product['material']}</div>
              <div className="table-cell">{product['precoM2']}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
