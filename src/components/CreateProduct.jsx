import React, { useState } from 'react';
import { db } from '../firebase'; // Importa a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importa funções do Firestore
import '../styles/Inputs.css';

const CreateProductInputs = () => {
  const [material, setMaterial] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [coluna, setColuna] = useState('');
  const [gramagem, setGramagem] = useState('');
  const [precoM2, setPrecoM2] = useState('');
  const [infos, setInfos] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, 'produtos'), {
        material,
        fornecedor,
        coluna,
        gramagem,
        precoM2,
        infos,
        categoria,
      });
      console.log('Produto salvo com ID: ', docRef.id);
      alert('Produto salvo com sucesso!'); // Alerta de sucesso
      // Limpar os campos após o salvamento
      setMaterial('');
      setFornecedor('');
      setColuna('');
      setGramagem('');
      setPrecoM2('');
      setInfos('');
      setCategoria('');
    } catch (error) {
      console.error('Erro ao adicionar produto: ', error);
      alert('Erro ao salvar produto. Tente novamente.'); // Alerta de erro
    }
  };

  return (
    <div className="input-wrapper">
      <h3 className='sectionTitle'>NOVO PRODUTO</h3>
      {/* Grupo MATERIAL */}
      <div className="groupBox">
        <h3>Material</h3>
        <input
          type="text"
          placeholder="Material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </div>

      {/* Grupo FORNECEDOR */}
      <div className="groupBox">
        <h3>Fornecedor</h3>
        <input
          type="text"
          placeholder="Fornecedor"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
        />
      </div>

      {/* Grupo COLUNA */}
      <div className="groupBox">
        <h3>Coluna</h3>
        <input
          type="text"
          placeholder="Coluna"
          value={coluna}
          onChange={(e) => setColuna(e.target.value)}
        />
      </div>

      {/* Grupo GRAMATURA */}
      <div className="groupBox">
        <h3>Gramatura</h3>
        <input
          type="text"
          placeholder="Gramatura"
          value={gramagem}
          onChange={(e) => setGramagem(e.target.value)}
        />
      </div>

      {/* Grupo PREÇO M² */}
      <div className="groupBox">
        <h3>Preço M²</h3>
        <input
          type="number"
          placeholder="Preço M²"
          value={precoM2}
          onChange={(e) => setPrecoM2(e.target.value)}
        />
      </div>

      {/* Grupo Infos */}
      <div className="groupBox">
        <h3>Infos</h3>
        <input
          type="text"
          placeholder="Informações"
          value={infos}
          onChange={(e) => setInfos(e.target.value)}
        />
      </div>

      {/* Grupo CATEGORIA */}
      <div className="groupBox">
        <h3>Categoria</h3>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          <option value="pedido-minimo">Pedido mínimo</option>
          <option value="economico">Econômico</option>
        </select>
      </div>

      {/* Botão de Salvar */}
      <div className="groupBox">
        <button onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
};

export default CreateProductInputs;
