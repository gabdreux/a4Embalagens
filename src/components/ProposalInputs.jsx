import React, { useEffect, useState } from 'react';
import '../styles/Inputs.css';
import '../styles/Styles.css';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { useInputContext } from '../context/InputsContext';
import GenerateDocButton from './generateDocButton';
import { useProposalContext } from '../context/ProposalContext';


const ProposalInputs = () => {
  const { handleInputChange, inputValues, resetInputs } = useInputContext();
  const { proposals, resetProposals } = useProposalContext();

  const [proposalNumber, setProposalNumber] = useState(1);


  useEffect(() => {
    const fetchLastProposalNumber = async () => {
      try {
        const q = query(collection(db, "orcamentos"), orderBy("numero", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const lastProposal = querySnapshot.docs[0].data();
          setProposalNumber(lastProposal.numero + 1); // Incrementa o último número encontrado
        }
      } catch (e) {
        console.error("Erro ao buscar o último número da proposta: ", e);
      }
    };

    fetchLastProposalNumber();
  }, []);


  const logInputChange = (name, value) => {
    handleInputChange(name, value);
  };


  const handleSave = async () => {
    try {

      const proposalData = {
        ...inputValues,
        propostas: proposals,
        dataCriacao: new Date().toISOString(),
        numero: proposalNumber,
      };

      const docRef = await addDoc(collection(db, "orcamentos"), proposalData);
      console.log("Documento escrito com ID: ", docRef.id);
      alert("Orçamento salvo com sucesso!");
      resetInputs();
      resetProposals();
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao salvar orçamento.");
    }
  };


  return (
    <div>

          <div className="center">
            <h2 className='viewTitle'>NOVO ORÇAMENTO</h2>
          </div>
        


          <div className="input-wrapper wrap">
                  
                 
                  <div className="infosNewProposal">

                    {/* Grupo NOME CLIENTE */}
                    <div className="groupBox">
                      <h3 className="sectionTitle">Nome do Cliente</h3>
                      <input
                        type="text"
                        onChange={(e) => logInputChange('nomeCliente', e.target.value)}
                        value={inputValues.nomeCliente || ''} 
                      />
                    </div>
              
                    {/* Grupo CNPJ*/}
                    <div className="groupBox">
                      <h3 className="sectionTitle">CNPJ</h3>
                      <input
                        type="text"
                        onChange={(e) => logInputChange('cnpj', e.target.value)}
                        value={inputValues.cnpj || ''}
                      />
                    </div>
              

                  </div>




                  <div className="infosNewProposal">

                    {/* Grupo Contato */}
                    <div className="groupBox">
                      <h3 className="sectionTitle">Contato</h3>
                      <input
                        type="text"
                        onChange={(e) => logInputChange('contato', e.target.value)}
                        value={inputValues.contato || ''} 
                      />
                    </div>

                    {/* Grupo Endereço*/}
                    <div className="groupBox">
                      <h3 className="sectionTitle">Endereço</h3>
                      <input
                        type="text"
                        onChange={(e) => logInputChange('endereco', e.target.value)}
                        value={inputValues.endereco || ''}
                      />
                    </div>


                    </div>
                                  



                  {/* Grupo MEDIDAS */}
                  <div className="groupBox medidasGroup">
                    <h3 className="sectionTitle">Medidas</h3>
                    <div className="shortInput">
                      <p>Comprimento</p>
                      <input
                        id="comprimento"
                        type="number"
                        onChange={(e) => logInputChange('comprimento', e.target.value)}
                        value={inputValues.comprimento || ''}
                      />
                    </div>


                    <div className="shortInput">
                      <p>Largura</p>
                      <input
                        id="largura"
                        type="number"
                        onChange={(e) => logInputChange('largura', e.target.value)}
                        value={inputValues.largura || ''}
                      />
                    </div>


              
                    <div className="shortInput">
                      <p>Altura</p>
                      <input
                        id="altura"
                        type="number"
                        onChange={(e) => logInputChange('altura', e.target.value)}
                        value={inputValues.altura || ''}
                      />
                    </div>
                  </div>


          </div>


          <div className="center">
            <div id="outrosItens" className="groupBox">
              <h3 className="sectionTitle">Outros itens</h3>
              <textarea
                onChange={(e) => logInputChange('outrosItens', e.target.value)}
                value={inputValues.outrosItens || ''}
                rows={6}
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>
          </div>


        
          <div className="wrap">         
              <div className="actionsButtons">
                <GenerateDocButton buttonText="Visualizar"/>
                <GenerateDocButton buttonText="Baixar" />
                <button onClick={handleSave}>Salvar</button>
              </div>
          </div>



  </div>
  
  );
};

export default ProposalInputs;
