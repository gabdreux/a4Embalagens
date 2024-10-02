import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Importa a configuração do Firebase
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Importa funções do Firestore
import '../styles/ProposalInputs.css';

const UpdateOptionsInputs = () => {
  const [lote, setLote] = useState('');
  const [pedidoMinimo, setPedidoMinimo] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'opcoes', 'HqAt4LQUIahw3W51yXoH'); // Referência ao documento específico
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Atualiza os estados com os dados do Firestore
          setLote(docSnap.data().lote || ''); 
          setPedidoMinimo(docSnap.data().pedido_minimo || '');
        } else {
          console.log('Nenhum documento encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar documento: ', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData(); // Chama a função para buscar os dados
  }, []);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'opcoes', 'HqAt4LQUIahw3W51yXoH'); // Referência ao documento específico

      // Cria um objeto de atualização com os valores atuais
      const updates = {};
      if (lote !== '') updates.lote = lote; // Adiciona lote se não estiver vazio
      if (pedidoMinimo !== '') updates.pedido_minimo = pedidoMinimo; // Adiciona pedido_minimo se não estiver vazio

      // Atualiza o documento se houver mudanças
      if (Object.keys(updates).length > 0) {
        await updateDoc(docRef, updates);
        console.log('Documento atualizado com ID: ', docRef.id);
        alert('Documento atualizado com sucesso!'); // Alerta de sucesso
      } else {
        alert('Nenhuma alteração feita.'); // Alerta se não houver alterações
      }

      // Limpar os campos após a atualização
    //   setLote('');
    //   setPedidoMinimo('');
    } catch (error) {
      console.error('Erro ao atualizar documento: ', error);
      alert('Erro ao atualizar documento. Tente novamente.'); // Alerta de erro
    }
  };

  if (loading) return <div>Carregando...</div>; // Exibe mensagem de carregamento

  return (
    
    <div className="product-input-wrapper">
      <h3 className="sectionTitle">OPÇÕES</h3>
      {/* Grupo LOTE */}
      <div className="group">
        <h3>LOTE</h3>
        <input
          type="text"
          placeholder="Lote"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
          required
        />
      </div>

      {/* Grupo PEDIDO MÍNIMO */}
      <div className="group">
        <h3>PEDIDO MÍNIMO</h3>
        <input
          type="number"
          placeholder="Pedido Mínimo"
          value={pedidoMinimo}
          onChange={(e) => setPedidoMinimo(e.target.value)}
          required
        />
      </div>

      {/* Botão de Atualizar */}
      <div className="group">
        <button onClick={handleUpdate} disabled={lote === '' || pedidoMinimo === ''}>
          Atualizar
        </button>
      </div>
    </div>
  );
};

export default UpdateOptionsInputs;
