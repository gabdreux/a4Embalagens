import React, { useEffect, useState } from 'react';
import '../styles/Inputs.css';
import '../styles/Styles.css';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, onSnapshot  } from 'firebase/firestore';
import { useInputContext } from '../context/InputsContext';
import GenerateDocButton from './generateDocButton';
import { useProposalContext } from '../context/ProposalContext';


const ProposalInputs = () => {
  const { handleInputChange, inputValues, resetInputs } = useInputContext();
  const { proposals, resetProposals } = useProposalContext();

  const [proposalNumber, setProposalNumber] = useState(1);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orcamentos"), (snapshot) => {
      if (!snapshot.empty) {
        const lastProposal = snapshot.docs.reduce((max, doc) => {
          const data = doc.data();
          return data.numero > max ? data.numero : max;
        }, 0);
        setProposalNumber(lastProposal + 1);
      } else {
        setProposalNumber(1);
      }
    });

    return () => unsubscribe();
  }, []);


  const logInputChange = (name, value) => {
    handleInputChange(name, value);
  };



    const formatPhoneNumber = (value) => {
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
  
      if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
      } else if (cleaned.length <= 10) {
        return cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else {
        return cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})$/, '($1) $2 $3-$4');
      }
    };
  

    const handleContactChange = (e) => {
      const formattedValue = formatPhoneNumber(e.target.value);
      logInputChange('contato', formattedValue);
    };



    const formatCNPJ = (value) => {
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
      
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
      } else {
        return cleaned;
      }
    };
    
    
    
    const handleCNPJChange = (e) => {
      const formattedCNPJ = formatCNPJ(e.target.value);
      logInputChange('cnpj', formattedCNPJ);
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
                        onChange={handleCNPJChange}
                        value={inputValues.cnpj || ''}
                        maxLength={18}
                      />
                    </div>
              

                  </div>




                  <div className="infosNewProposal">

                    {/* Grupo Contato */}
                    <div className="groupBox">
                      <h3 className="sectionTitle">Contato</h3>
                      <input
                        type="text"
                        onChange={handleContactChange}
                        value={inputValues.contato || ''}
                        maxLength={15} 
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

          {/* <div className="center">
            <div id="outrosItens" className="groupBox">
              <h3 className="sectionTitle">Condições Comerciais</h3>
              <textarea
                onChange={(e) => logInputChange('condicoesComerciais', e.target.value)}
                value={inputValues.condicoesComerciais || 'Boleto | 30 Dias | R$ 00,00 | 00/00/0000\n\nBoleto | 30 Dias | R$ 00,00 | 00/00/0000\n\nBoleto | 30 Dias | R$ 00,00 | 00/00/0000\n\n'}
                rows={6}
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>
          </div> */}


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
