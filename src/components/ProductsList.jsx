import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import '../styles/Lists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const ProductsList = () => {
  const [minData, setMinData] = useState([]);
  const [ecoData, setEcoData] = useState([]);
  const [editingData, setEditingData] = useState({}); // Estado para dados sendo editados

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const minQuery = query(collection(db, 'produtos'), where('categoria', '==', 'pedido-minimo'));
        const minSnapshot = await getDocs(minQuery);
        const minProducts = minSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMinData(minProducts);

        const ecoQuery = query(collection(db, 'produtos'), where('categoria', '==', 'economico'));
        const ecoSnapshot = await getDocs(ecoQuery);
        const ecoProducts = ecoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEcoData(ecoProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos do Firestore:', error);
      }
    };

    fetchProductData();
  }, []);

  const handleDelete = async (id, category) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja deletar este produto?');

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'produtos', id));
      console.log(`Produto ${id} deletado com sucesso`);
      alert('Produto deletado com sucesso!');
      if (category === 'pedido-minimo') {
        setMinData(minData.filter(product => product.id !== id));
      } else if (category === 'economico') {
        setEcoData(ecoData.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
    }
  };

  const handleEditChange = (e, id, field) => {
    setEditingData({
      ...editingData,
      [id]: {
        ...editingData[id],
        [field]: e.target.value
      }
    });
  };

  const handleSave = async (id, category) => {
    try {
      const updatedData = editingData[id];
      await updateDoc(doc(db, 'produtos', id), updatedData);
      alert('Produto atualizado com sucesso!');
      
      // Atualiza o estado local após salvar
      if (category === 'pedido-minimo') {
        setMinData(minData.map(product => product.id === id ? { ...product, ...updatedData } : product));
      } else if (category === 'economico') {
        setEcoData(ecoData.map(product => product.id === id ? { ...product, ...updatedData } : product));
      }

      // Limpa o estado de edição
      setEditingData(prev => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      });

    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
    }
  };

  const renderProductRow = (product, category) => {
    const isEditing = editingData[product.id] || {};

    return (
      <div key={product.id} className="table-row">
        <div className="table-cell">
          <input 
            type="text"
            value={isEditing.material || product.material}
            onChange={(e) => handleEditChange(e, product.id, 'material')}
          />
        </div>
        <div className="table-cell">
          <input 
            type="text"
            value={isEditing.fornecedor || product.fornecedor}
            onChange={(e) => handleEditChange(e, product.id, 'fornecedor')}
          />
        </div>
        <div className="table-cell">
          <input 
            type="text"
            value={isEditing.coluna || product.coluna}
            onChange={(e) => handleEditChange(e, product.id, 'coluna')}
          />
        </div>
        <div className="table-cell">
          <input 
            type="text"
            value={isEditing.gramagem || product.gramagem}
            onChange={(e) => handleEditChange(e, product.id, 'gramagem')}
          />
        </div>
        <div className="table-cell">
          <input 
            type="text"
            value={isEditing.precoM2 || product.precoM2}
            onChange={(e) => handleEditChange(e, product.id, 'precoM2')}
          />
        </div>
        <div className="table-cell">
          <input 
            type="text"
            value={isEditing.infos || product.infos}
            onChange={(e) => handleEditChange(e, product.id, 'infos')}
          />
        </div>
        <div className="table-cell">
          <select 
            value={isEditing.onda || product.onda || ''} // Valor inicial pode ser vazio
            onChange={(e) => handleEditChange(e, product.id, 'onda')}
          >
            <option value="">Selecione</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="BC">BC</option>
          </select>
        </div>

        <div className="table-cell">
          <FontAwesomeIcon 
            icon={faSave} 
            onClick={() => handleSave(product.id, category)} 
            className="save-icon"
          />
        </div>
        <div className="table-cell">
          <FontAwesomeIcon 
            icon={faTrash} 
            onClick={() => handleDelete(product.id, category)} 
            className="delete-icon"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="center">
        <h2 className="viewTitle">PRODUTOS</h2>
      </div>

      <div className="listWrapper">
        <h2>MÍNIMO</h2>
        <div className="list-container">
          <div className="table-header">
            <div className="table-row">
              <div className="table-cell"><span>MATERIAL</span></div>
              <div className="table-cell"><span>FORNECEDOR</span></div>
              <div className="table-cell"><span>COLUNA</span></div>
              <div className="table-cell"><span>GRAMATURA</span></div>
              <div className="table-cell"><span>VALOR M²</span></div>
              <div className="table-cell"><span>INFOS</span></div>
              <div className="table-cell"><span>ONDA</span></div>
              <div className="table-cell"><span>SALVAR</span></div>
              <div className="table-cell"><span>DELETAR</span></div>
            </div>
          </div>
          <div className="table-body">
            {minData.map((product) => renderProductRow(product, 'pedido-minimo'))}
          </div>
        </div>

        <h2>ECONÔMICO</h2>
        <div className="list-container">
          <div className="table-header">
            <div className="table-row">
              <div className="table-cell"><span>MATERIAL</span></div>
              <div className="table-cell"><span>FORNECEDOR</span></div>
              <div className="table-cell"><span>COLUNA</span></div>
              <div className="table-cell"><span>GRAMATURA</span></div>
              <div className="table-cell"><span>VALOR M²</span></div>
              <div className="table-cell"><span>INFOS</span></div>
              <div className="table-cell"><span>ONDA</span></div>
              <div className="table-cell"><span>SALVAR</span></div>
              <div className="table-cell"><span>DELETAR</span></div>
            </div>
          </div>
          <div className="table-body">
            {ecoData.map((product) => renderProductRow(product, 'economico'))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
