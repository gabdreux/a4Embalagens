import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import '../styles/Inputs.css';
import '../styles/Styles.css';

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

    <div>

    <div className="center">
      <h2 className="viewTitle">OPÇÕES</h2>      
    </div>
    
    <div className="input-wrapper">
      <div id="createProduct_CGP_wrap" className="wrap">
      {/* Grupo PEDIDO MÍNIMO */}
      <div className="groupBox">
        <h3>PEDIDO MÍNIMO<span className="unit">(R$)</span></h3>
        <div className="shortInput">
        <input
          type="number"
          value={pedidoMinimo}
          onChange={(e) => setPedidoMinimo(e.target.value)}
          required
        />
        </div>
      </div>

      {/* Grupo LOTE */}
      <div className="groupBox">
        <h3>LOTE <span className="unit">(m²)</span></h3>
        <div className="shortInput">
        <input
          type="text"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
          required
        />
        </div>
      </div>
      </div>


      {/* Botão de Atualizar */}
      <div className="groupBox">
        <button  id="saveBtn" onClick={handleUpdate} disabled={lote === '' || pedidoMinimo === ''}>
          Atualizar
        </button>
      </div>
    </div>
    </div>
  );
};

export default UpdateOptionsInputs;
