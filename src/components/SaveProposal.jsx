import React from 'react';
import { db } from '../firebase'; // Importe a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore';
import { useInputContext } from '../context/InputsContext';

const SaveProposalButton = () => {
  const { inputValues } = useInputContext();

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "orcamentos"), {
        ...inputValues,
      });
      console.log("Documento escrito com ID: ", docRef.id);
      alert("Orçamento salvo com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao salvar orçamento.");
    }
  };

  return (
    <button onClick={handleSave}>
      Salvar Orçamento
    </button>
  );
};

export default SaveProposalButton;
