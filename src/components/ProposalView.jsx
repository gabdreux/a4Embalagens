import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importa a configuração do Firebase
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa funções do Firestore
import '../styles/Lists.css';
import { useInputContext } from '../context/InputsContext';

const ProposalView = () => {
  const [minData, setMinData] = useState([]);
  const [ecoData, setEcoData] = useState([]);
  const { inputValues } = useInputContext();

  const simples = parseFloat(inputValues.simples || 0);
  const margem = parseFloat(inputValues.margem || 0);
  const comprimento = parseFloat(inputValues.comprimento || 0);
  const altura = parseFloat(inputValues.altura || 0);
  const largura = parseFloat(inputValues.largura || 0);

  const calculateFinalValue = (precoM2) => {
    const simplesPercentual = simples / 100;
    const margemPercentual = margem / 100;

    const precoM2Float = parseFloat(precoM2) || 0; // Se não for um número, usa 0

    return (precoM2Float + (precoM2Float * simplesPercentual) + (precoM2Float * margemPercentual)).toFixed(2);
  };

  const calculateCost = (onda, precoM2) => {
    let area = 0;
    if (onda === "B") {
      area = (((comprimento * 2) + (largura * 2) + 40) * (altura + largura + 10)) / 1000000;
    } else if (onda === "C") {
      area = (((comprimento * 2) + (largura * 2) + 48) * (altura + largura + 15)) / 1000000;
    } else if (onda === "BC") {
      area = (((comprimento * 2) + (largura * 2) + 58) * (altura + largura + 25)) / 1000000;
    }

    return area * precoM2; // Retorna a área multiplicada pelo preço por metro quadrado
  };

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
    <div className="listWrapper" id="print">
      {/* Tabela MÍNIMO */}
      <h2>MÍNIMO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>CUSTO S/ NF</span></div>
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>CUSTO</span></div>
            <div className="table-cell"><span>QUANTIDADE</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>VALOR DE VENDA</span></div>
          </div>
        </div>
        <div className="table-body">
          {minData.map((product) => {
            const custo = calculateCost(product['onda'], product['precoM2']);
            const costWithoutTax = (custo * 0.93).toFixed(2); 

            return (
              <div key={product.id} className="table-row">
                <div className="table-cell">{costWithoutTax}</div>
                <div className="table-cell">{product['fornecedor']}</div>
                <div className="table-cell">{custo.toFixed(2)}</div>
                <div className="table-cell">{product['precoM2']}</div>
                <div className="table-cell">{product['material']}</div>
                <div className="table-cell">{calculateFinalValue(product['precoM2'])}</div>
                {/* <div className="table-cell">{calculateFinalValue(custo)}</div> */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabela ECONÔMICO */}
      <h2>ECONÔMICO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>CUSTO S/ NF</span></div>
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>CUSTO</span></div>
            <div className="table-cell"><span>QUANTIDADE</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>VALOR DE VENDA</span></div>
          </div>
        </div>
        <div className="table-body">
          {ecoData.map((product) => {
            const custo = calculateCost(product['onda'], product['precoM2']); // Calcula o custo

            return (
              <div key={product.id} className="table-row">
                <div className="table-cell">{(product['precoM2'] * 0.93).toFixed(2)}</div>
                <div className="table-cell">{product['fornecedor']}</div>
                <div className="table-cell">{custo.toFixed(2)}</div>
                <div className="table-cell">{product['precoM2']}</div>
                <div className="table-cell">{product['material']}</div>
                <div className="table-cell">{calculateFinalValue(product['precoM2'])}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProposalView;
