import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import '../styles/Inputs.css';

const UpdateOptionsInputs = () => {
  const [lote, setLote] = useState('');
  const [pedidoMinimo, setPedidoMinimo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'opcoes', 'HqAt4LQUIahw3W51yXoH');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLote(docSnap.data().lote || ''); 
          setPedidoMinimo(docSnap.data().pedido_minimo || '');
        } else {
          console.log('Nenhum documento encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar documento: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'opcoes', 'HqAt4LQUIahw3W51yXoH');

      const updates = {};
      if (lote !== '') updates.lote = lote;
      if (pedidoMinimo !== '') updates.pedido_minimo = pedidoMinimo;
      if (Object.keys(updates).length > 0) {
        await updateDoc(docRef, updates);
        console.log('Documento atualizado com ID: ', docRef.id);
        alert('Documento atualizado com sucesso!');
      } else {
        alert('Nenhuma alteração feita.');
      }

    } catch (error) {
      console.error('Erro ao atualizar documento: ', error);
      alert('Erro ao atualizar documento. Tente novamente.');
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    
    <div className="input-wrapper">
      <h3 className="sectionTitle">OPÇÕES</h3>

      
      {/* Grupo PEDIDO MÍNIMO */}
      <div className="groupBox">
        <h3>PEDIDO MÍNIMO</h3>
        <input
          type="number"
          placeholder="Pedido Mínimo"
          value={pedidoMinimo}
          onChange={(e) => setPedidoMinimo(e.target.value)}
          required
        />
      </div>

      {/* Grupo LOTE */}
      <div className="groupBox">
        <h3>LOTE</h3>
        <input
          type="text"
          placeholder="Lote"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
          required
        />
      </div>

      {/* Botão de Atualizar */}
      <div className="groupBox">
        <button onClick={handleUpdate} disabled={lote === '' || pedidoMinimo === ''}>
          Atualizar
        </button>
      </div>
    </div>
  );
};

export default UpdateOptionsInputs;
