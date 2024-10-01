import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import '../styles/productList.css';

const ProductList = () => {
  const [minData, setMinData] = useState([]);
  const [ecoData, setEcoData] = useState([]);

  useEffect(() => {
    // Função para ler o arquivo Excel
    const fetchExcelData = async () => {
      try {
        const response = await fetch(require('../assets/fornecedores/dados.xlsx'));
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Ler a aba 'min'
          const minSheet = workbook.Sheets['min'];
          const minJson = XLSX.utils.sheet_to_json(minSheet);

          // Ler a aba 'economico'
          const ecoSheet = workbook.Sheets['economico'];
          const ecoJson = XLSX.utils.sheet_to_json(ecoSheet);

          // Atualizar estados com dados processados
          setMinData(minJson);
          setEcoData(ecoJson);
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error('Erro ao carregar arquivo Excel:', error);
      }
    };

    fetchExcelData();
  }, []);

  return (
    <div className="productListWrapper">
      {/* Tabela MINIMO */}
      <h2>MINIMO</h2>
      <div className="product-list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
          </div>
        </div>
        <div className="table-body">
          {minData.map((product, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">{product['FORNECEDOR']}</div>
              <div className="table-cell">{product['MATERIAL']}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela ECONOMICO */}
      <h2>ECONOMICO</h2>
      <div className="product-list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
          </div>
        </div>
        <div className="table-body">
          {ecoData.map((product, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">{product['FORNECEDOR']}</div>
              <div className="table-cell">{product['MATERIAL']}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

