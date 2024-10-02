import React from 'react';
import '../styles/ProposalInputs.css';
import { db } from '../firebase'; // Importe a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore';
import { useInputContext } from '../context/InputsContext'; // Importe o contexto

const ProposalInputs = () => {
  const { handleInputChange, inputValues, resetInputs } = useInputContext(); // Use o contexto

  const logInputChange = (name, value) => {
    handleInputChange(name, value); // Envie o valor para o contexto
  };

  const handleSave = async () => {
    try {
      // Cria um novo objeto que inclui todos os valores de input e a data de criação
      const proposalData = {
        ...inputValues,
        dataCriacao: new Date().toISOString(), // Adiciona a data de criação no formato ISO
      };

      const docRef = await addDoc(collection(db, "orcamentos"), proposalData);
      console.log("Documento escrito com ID: ", docRef.id);
      alert("Orçamento salvo com sucesso!");
      resetInputs(); // Redefine os inputs após salvar
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao salvar orçamento.");
    }
  };

  return (
    <div className="product-input-wrapper">
    <h3 className='sectionTitle'>NOVO ORÇAMENTO</h3>
    
    {/* Grupo NOME DO CLIENTE */}
    <div className="group">
      <h3>Nome do Cliente</h3>
      <input
        type="text"
        placeholder="Nome do Cliente"
        onChange={(e) => logInputChange('nomeCliente', e.target.value)} // Envie o valor para o contexto
        value={inputValues.nomeCliente || ''} // Vincule o valor do input ao contexto
      />
    </div>

    {/* Grupo NOVA PROPOSTA */}
    <div className="group">
      <h3>Nome do Produto</h3>
      <input
        type="text"
        placeholder="Nome do Produto"
        onChange={(e) => logInputChange('nomeProduto', e.target.value)} // Envie o valor para o contexto
        value={inputValues.nomeProduto || ''} // Vincule o valor do input ao contexto
      />
    </div>

    {/* Grupo ALÍQUOTAS */}
    <div className="group">
      <h3>Alíquotas</h3>
      <input
        type="text"
        placeholder="Simples"
        onChange={(e) => logInputChange('simples', e.target.value)} // Envie o valor para o contexto
        value={inputValues.simples || ''} // Vincule o valor do input ao contexto
      />
    </div>

    {/* Grupo MEDIDAS */}
    <div className="group">
      <h3>Medidas</h3>
      <input
        type="number"
        placeholder="Comprimento"
        onChange={(e) => logInputChange('comprimento', e.target.value)} // Envie o valor para o contexto
        value={inputValues.comprimento || ''} // Vincule o valor do input ao contexto
      />
      <input
        type="number"
        placeholder="Altura"
        onChange={(e) => logInputChange('altura', e.target.value)} // Envie o valor para o contexto
        value={inputValues.altura || ''} // Vincule o valor do input ao contexto
      />
      <input
        type="number"
        placeholder="Largura"
        onChange={(e) => logInputChange('largura', e.target.value)} // Envie o valor para o contexto
        value={inputValues.largura || ''} // Vincule o valor do input ao contexto
      />
    </div>

    {/* Input sem título */}
    <div className="group">
      <input
        type="number"
        placeholder="% MARGEM CONTRIB. OBJETIVA"
        onChange={(e) => logInputChange('margem', e.target.value)} // Envie o valor para o contexto
        value={inputValues.margem || ''} // Vincule o valor do input ao contexto
      />
    </div>

    {/* Botão de Salvar */}
    <button onClick={handleSave}>
      Salvar Orçamento
    </button>
  </div>
  );
};

export default ProposalInputs;
