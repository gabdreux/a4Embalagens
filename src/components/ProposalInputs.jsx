import React from 'react';
import '../styles/Inputs.css';
import { db } from '../firebase'; // Importe a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore';
import { useInputContext } from '../context/InputsContext'; // Importe o contexto
import GenerateDocButton from './generateDocButton';

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
    <div>

          <h3 className='sectionTitle'>NOVO ORÇAMENTO</h3>
        


          <div className="input-wrapper wrap">
                  <div className="infosNewProposal">
                    <div className="groupBox">
                      <h3>Nome do Cliente</h3>
                      <input
                        type="text"
                        onChange={(e) => logInputChange('nomeCliente', e.target.value)} // Envie o valor para o contexto
                        value={inputValues.nomeCliente || ''} // Vincule o valor do input ao contexto
                      />
                    </div>
              
                    {/* Grupo NOVA PROPOSTA */}
                    <div className="groupBox">
                      <h3>Nome do Produto</h3>
                      <input
                        type="text"
                        onChange={(e) => logInputChange('nomeProduto', e.target.value)} // Envie o valor para o contexto
                        value={inputValues.nomeProduto || ''} // Vincule o valor do input ao contexto
                      />
                    </div>
              
                    {/* Grupo ALÍQUOTAS */}
                    <div className="groupBox">
                      <h3>Alíquotas</h3>
                      <div className="shortInput">
                        <p>Simples</p>
                        <input
                          id="simples"
                          type="text"
                          onChange={(e) => logInputChange('simples', e.target.value)} // Envie o valor para o contexto
                          value={inputValues.simples || ''} // Vincule o valor do input ao contexto
                        />
                      </div>
                    </div>
                  </div>
              



                  {/* Grupo MEDIDAS */}
                  <div className="groupBox medidasGroup">
                    <h3>Medidas</h3>
                    <div className="shortInput">
                      <p>Comprimento</p>
                      <input
                        id="comprimento"
                        type="number"
                        onChange={(e) => logInputChange('comprimento', e.target.value)} // Envie o valor para o contexto
                        value={inputValues.comprimento || ''} // Vincule o valor do input ao contexto
                      />
                    </div>
              
                    <div className="shortInput">
                      <p>Altura</p>
                      <input
                        id="altura"
                        type="number"
                        onChange={(e) => logInputChange('altura', e.target.value)} // Envie o valor para o contexto
                        value={inputValues.altura || ''} // Vincule o valor do input ao contexto
                      />
                    </div>
              
                    <div className="shortInput">
                      <p>Largura</p>
                      <input
                        id="largura"
                        type="number"
                        onChange={(e) => logInputChange('largura', e.target.value)} // Envie o valor para o contexto
                        value={inputValues.largura || ''} // Vincule o valor do input ao contexto
                      />
                    </div>
                  </div>


          </div>


        
          <div className="wrap">
              <div className="groupBox shortInput center" id="mco">
                <h3>% MARGEM CONTRIB. OBJETIVA</h3>
                <input
                  id="margem"
                  type="number"
                  onChange={(e) => logInputChange('margem', e.target.value)} // Envie o valor para o contexto
                  value={inputValues.margem || ''} // Vincule o valor do input ao contexto
                />
              </div>
          
              <div className="actionsButtons">
                <button onClick={handleSave}>Salvar Orçamento</button>
                <GenerateDocButton buttonText="Visualizar" />
                <GenerateDocButton buttonText="Baixar" />
              </div>
          </div>



  </div>
  
  );
};

export default ProposalInputs;
