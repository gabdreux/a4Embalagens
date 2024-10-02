import React, { useState } from 'react';
import '../styles/ProposalInputs.css'; // Você pode criar um arquivo CSS para estilos

const ProposalInputs = () => {
  const [productName, setProductName] = useState('');
  const [simple, setSimple] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [marginContribution, setMarginContribution] = useState('');

  return (
    <div className="product-input-wrapper">
      {/* Grupo NOVA PROPOSTA */}
      <div className="group">
        <h3>NOVA PROPOSTA</h3>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      {/* Grupo ALÍQUOTAS */}
      <div className="group">
        <h3>ALÍQUOTAS</h3>
        <input
          type="text"
          placeholder="Simples"
          value={simple}
          onChange={(e) => setSimple(e.target.value)}
        />
      </div>

      {/* Grupo MEDIDAS */}
      <div className="group">
        <h3>MEDIDAS</h3>
        <input
          type="number"
          placeholder="Comprimento"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <input
          type="number"
          placeholder="Altura"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Largura"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </div>

      {/* Input sem título */}
      <div className="group">
        <input
          type="number"
          placeholder="% MARGEM CONTRIB. OBJETIVA"
          value={marginContribution}
          onChange={(e) => setMarginContribution(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProposalInputs;
