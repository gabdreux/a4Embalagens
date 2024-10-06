import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/Inputs.css';

const CreateProductInputs = () => {
  const [material, setMaterial] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [coluna, setColuna] = useState('');
  const [gramagem, setGramagem] = useState('');
  const [precoM2, setPrecoM2] = useState('');
  const [infos, setInfos] = useState('');
  const [categoria, setCategoria] = useState('');
  const [onda, setOnda] = useState('');

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
        onda,
      });
      console.log('Produto salvo com ID: ', docRef.id);
      alert('Produto salvo com sucesso!');
      setMaterial('');
      setFornecedor('');
      setColuna('');
      setGramagem('');
      setPrecoM2('');
      setInfos('');
      setCategoria('');
      setOnda('');
    } catch (error) {
      console.error('Erro ao adicionar produto: ', error);
      alert('Erro ao salvar produto. Tente novamente.');
    }
  };

  return (

    <div>

          <div className="center">
            <h2 className='viewTitle'>NOVO PRODUTO</h2>
          </div>

    <div className="input-wrapper ">


      {/* Grupo MATERIAL */}
      <div className="groupBox">
        <h3 className="sectionTitle">Material</h3>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </div>

      {/* Grupo FORNECEDOR */}
      <div className="groupBox">
        <h3 className="sectionTitle">Fornecedor</h3>
        <input
          type="text"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
        />
      </div>


      <div id="createProduct_CGP_wrap" className="wrap">

      {/* Grupo COLUNA */}
      <div className="groupBox">
        <h3 className="sectionTitle">Coluna</h3>
        <div className="shortInput">
        <input
          type="text"
          value={coluna}
          onChange={(e) => setColuna(e.target.value)}
        />
        </div>
      </div>

      {/* Grupo GRAMATURA */}
      <div className="groupBox">
        <h3 className="sectionTitle">Gramatura</h3>
        <div className="shortInput">
        <input
          type="text"
          value={gramagem}
          onChange={(e) => setGramagem(e.target.value)}
        />
        </div>
      </div>

      {/* Grupo PREÇO M² */}
      <div className="groupBox">
        <h3 className="sectionTitle">Preço M²</h3>
        <div className="shortInput">
        <input
          type="number"
          value={precoM2}
          onChange={(e) => setPrecoM2(e.target.value)}
        />
        </div>
      </div>
      </div>


      {/* Grupo Infos */}
      <div className="groupBox">
        <h3 className="sectionTitle">Infos</h3>
        <input
          type="text"
          value={infos}
          onChange={(e) => setInfos(e.target.value)}
        />
      </div>

      {/* Grupo CATEGORIA */}
      <div className="groupBox">
        <h3 className="sectionTitle">Categoria</h3>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          <option value="pedido-minimo">Pedido mínimo</option>
          <option value="economico">Econômico</option>
        </select>
      </div>

        {/* Grupo ONDA */}
        <div className="groupBox">
        <h3 className="sectionTitle">Onda</h3>
        <select
          value={onda}
          onChange={(e) => setOnda(e.target.value)}
        >
          <option value="">Selecione uma onda</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="B">BC</option>
        </select>
      </div>

      {/* Botão de Salvar */}
      <div className="groupBox">
        <button id="createProductBtn" onClick={handleSave}>Salvar</button>
      </div>
    </div>

  </div>
  );
};

export default CreateProductInputs;
