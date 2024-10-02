import React from 'react';
import '../styles/ProposalInputs.css';
import { useInputContext } from '../context/InputsContext'; // Importe o contexto

const ProposalInputs = () => {
  const { handleInputChange } = useInputContext(); // Use o contexto

  const logInputChange = (name, value) => {
    // console.log(`${name}: ${value}`); // Log dos valores alterados
    handleInputChange(name, value); // Envie o valor para o contexto
  };

  return (
    <div className="product-input-wrapper">
      {/* Grupo NOVA PROPOSTA */}
      <div className="group">
        <h3>NOVA PROPOSTA</h3>
        <input
          type="text"
          placeholder="Nome do Produto"
          onChange={(e) => logInputChange('productName', e.target.value)} // Envie o valor para o contexto
        />
      </div>

      {/* Grupo ALÍQUOTAS */}
      <div className="group">
        <h3>ALÍQUOTAS</h3>
        <input
          type="text"
          placeholder="Simples"
          onChange={(e) => logInputChange('simple', e.target.value)} // Envie o valor para o contexto
        />
      </div>

      {/* Grupo MEDIDAS */}
      <div className="group">
        <h3>MEDIDAS</h3>
        <input
          type="number"
          placeholder="Comprimento"
          onChange={(e) => logInputChange('Comprimento', e.target.value)} // Envie o valor para o contexto
        />
        <input
          type="number"
          placeholder="Altura"
          onChange={(e) => logInputChange('Altura', e.target.value)} // Envie o valor para o contexto
        />
        <input
          type="number"
          placeholder="Largura"
          onChange={(e) => logInputChange('Largura', e.target.value)} // Envie o valor para o contexto
        />
      </div>

      {/* Input sem título */}
      <div className="group">
        <input
          type="number"
          placeholder="% MARGEM CONTRIB. OBJETIVA"
          onChange={(e) => logInputChange('margem', e.target.value)} // Envie o valor para o contexto
        />
      </div>
    </div>
  );
};

export default ProposalInputs;
