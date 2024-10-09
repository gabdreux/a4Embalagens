import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import '../styles/Lists.css';
import { useInputContext } from '../context/InputsContext';
import { useProposalContext } from '../context/ProposalContext';



const ProposalView = () => {
  
  const [minData, setMinData] = useState([]);
  const [ecoData, setEcoData] = useState([]);
  const { inputValues } = useInputContext();
  const { addProposal, resetProposals } = useProposalContext();



  const comprimento = parseFloat(inputValues.comprimento || 0);
  const altura = parseFloat(inputValues.altura || 0);
  const largura = parseFloat(inputValues.largura || 0);


  const [pedidoMinimo, setPedidoMinimo] = useState(0);
  const [lote, setLote] = useState(0);  
  const [simples, setSimples] = useState(0);
  const [margem, setMargem] = useState(0);
  const [opcoesData, setOpcoesData] = useState({ lote: null, pedido_minimo: null, simples: null, margem: null });


  const [hasAccess, setHasAccess] = useState(false);


  useEffect(() => {
    const storedKey = localStorage.getItem('role');
    setHasAccess(!!storedKey);
  }, []);



  const calculateFinalValue = (cost) => {
    const simplesPercentual = simples / 100;
    const margemPercentual = margem / 100;
    const costFloat = parseFloat(cost) || 0;
    const finalValue = (costFloat / (1 - simplesPercentual - margemPercentual)).toFixed(3);
    //  console.log(`${costFloat} / (${costFloat} * ${simplesPercentual}) - (${costFloat} * ${margemPercentual}) = ${finalValue}`);
    return finalValue;
  };



  const calculateCost = (onda, precoM2) => {
    let area = 0;
    if (onda === "B") {
      area = (((comprimento * 2) + (largura * 2) + 40) * (altura + largura + 10)) / 1000000;
    } else if (onda === "C") {
      area = (((comprimento * 2) + (largura * 2) + 48) * (altura + largura + 15)) / 1000000;
    } else if (onda === "BC") {
      area = (((comprimento * 2) + (largura * 2) + 58) * (altura + largura + 25)) / 1000000;
    }

    return area * precoM2;
  };

  const calculateAreaLote = (onda) => {
    let area = 0;
    if (onda === "B") {
      area = (((comprimento * 2) + (largura * 2) + 40) * (altura + largura + 10)) / 1000000;
    } else if (onda === "C") {
      area = (((comprimento * 2) + (largura * 2) + 48) * (altura + largura + 15)) / 1000000;
    } else if (onda === "BC") {
      area = (((comprimento * 2) + (largura * 2) + 58) * (altura + largura + 25)) / 1000000;
    }

    return area;
  };



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


        const opcoesRef = doc(db, 'opcoes', 'HqAt4LQUIahw3W51yXoH');
        const opcoesSnapshot = await getDoc(opcoesRef);
        if (opcoesSnapshot.exists()) {
          const data = opcoesSnapshot.data();
          setOpcoesData(data);
          setPedidoMinimo(data.pedido_minimo || 0);
          setLote(data.lote || 0);
          setMargem(data.margem || 0);
          setSimples(data.simples || 0);
          console.log('Dados das opções:', data);
        } else {
          console.log("Nenhum documento encontrado!");
        }


      } catch (error) {
        console.error('Erro ao carregar produtos do Firestore:', error.message);
      }
    };

    fetchProductData();
  }, []);


  


  useEffect(() => {
    const handleSaveProposal = () => {
      resetProposals();
      let proposals = [];

      // Coletando dados para a tabela MÍNIMO
      minData.forEach((product, index) => {
        const custo = calculateCost(product['onda'], product['precoM2']);
        const costWithoutTax = (custo * 0.93).toFixed(3);
        const quantidade = Math.ceil(pedidoMinimo / custo);
        const finalValue = calculateFinalValue(custo);
        const precoUn = (finalValue > 0 ? (quantidade / finalValue) : 0).toFixed(3);

        const proposal = {
          index: index + 1, // Nº começando em 1
          material: product['material'],
          quantidade: quantidade,
          precoUn: precoUn,
          valor: finalValue,
          modalidade: product['categoria'],
        };

        proposals.push(proposal);
      });

      // Coletando dados para a tabela ECONÔMICO
      ecoData.forEach((product, index) => {
        const custo = calculateCost(product['onda'], product['precoM2']);
        const costWithoutTax = (custo * 0.93).toFixed(3);
        const quantidade = Math.ceil(lote / calculateAreaLote(product['onda']));
        const finalValue = calculateFinalValue(custo);
        const precoUn = (finalValue > 0 ? (quantidade / finalValue) : 0).toFixed(3);

        const proposal = {
          index: minData.length + index + 1,
          material: product['material'],
          quantidade: quantidade,
          precoUn: precoUn,
          valor: finalValue,
          modalidade: product['categoria'],
        };

        proposals.push(proposal);
      });

      proposals.forEach(proposal => {
        addProposal(proposal);
      });
    };


    handleSaveProposal();
  }, [minData, ecoData, simples, margem, comprimento, altura, largura, pedidoMinimo]);

  



  return (
    <div className="listWrapper">
      {/* Tabela MÍNIMO */}
      <h2>MÍNIMO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell proposalView"><span>CUSTO S/ NF</span></div>
            <div className="table-cell proposalView"><span>FORNECEDOR</span></div>
            <div className="table-cell proposalView"><span>CUSTO</span></div>
            <div className="table-cell proposalView"><span>QUANTIDADE</span></div>
            <div className="table-cell proposalView"><span>MATERIAL</span></div>
            <div className="table-cell proposalView"><span>IMPRESSÃO</span></div>
            <div className="table-cell proposalView">MODELO<span></span></div>
            <div className="table-cell proposalView"><span>VALOR</span></div>
            <div className="table-cell proposalView"><span>ADD</span></div>
          </div>
        </div>
        <div className="table-body">
          {minData.map((product) => {
            const custo = calculateCost(product['onda'], product['precoM2']);
            const costWithoutTax = (custo * 0.93).toFixed(3);
            const quantidade = Math.ceil(pedidoMinimo / custo);


            return (
              <div key={product.id} className="table-row">
                <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}>{costWithoutTax}</div>
                <div className="table-cell proposalView">{product['fornecedor']}</div>
                <div className="table-cell proposalView">{custo.toFixed(3)}</div>
                <div className="table-cell proposalView">{quantidade}</div>
                <div className="table-cell proposalView">{product['material']}</div>
                <input  className="table-cell proposalView" type="checkbox" id="checkbox" name="option" value="selected"></input>
                <select  className="table-cell proposalView" id="dropdown" name="tipo">
                  <option value=""></option>
                  <option value="normal">NORMAL</option>
                  <option value="corte-vinco">CORTE E VINCO</option>
                </select>
                <div className="table-cell proposalView">{calculateFinalValue(custo)}</div>
                <input  className="table-cell proposalView" type="checkbox" id="checkbox" name="option" value="selected"></input>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabela ECONÔMICO */}
      <h2>ECONÔMICO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell proposalView"><span>CUSTO S/ NF</span></div>
            <div className="table-cell proposalView"><span>FORNECEDOR</span></div>
            <div className="table-cell proposalView"><span>CUSTO</span></div>
            <div className="table-cell proposalView"><span>QUANTIDADE</span></div>
            <div className="table-cell proposalView"><span>MATERIAL</span></div>
            <div className="table-cell proposalView"><span>IMPRESSÃO</span></div>
            <div className="table-cell proposalView">MODELO<span></span></div>
            <div className="table-cell proposalView"><span>VALOR</span></div>
            <div className="table-cell proposalView"><span>ADD</span></div>
          </div>
        </div>
        <div className="table-body">
          {ecoData.map((product) => {
            const custo = calculateCost(product['onda'], product['precoM2']);
            const costWithoutTax = (custo * 0.93).toFixed(3);
            const quantidade = Math.ceil(lote / calculateAreaLote(product['onda']));

            return (
              <div key={product.id} className="table-row">
                <div className="table-cell proposalView">{costWithoutTax}</div>
                <div className="table-cell proposalView">{product['fornecedor']}</div>
                <div className="table-cell proposalView">{custo.toFixed(3)}</div>
                <div className="table-cell proposalView">{quantidade}</div>
                <div className="table-cell proposalView">{product['material']}</div>
                <input  className="table-cell proposalView" type="checkbox" id="checkbox" name="option" value="selected"></input>
                <select  className="table-cell proposalView" id="dropdown" name="tipo">
                  <option value=""></option>
                  <option value="normal">NORMAL</option>
                  <option value="corte-vinco">CORTE E VINCO</option>
                </select>
                <div className="table-cell proposalView">{calculateFinalValue(custo)}</div>
                <input  className="table-cell proposalView" type="checkbox" id="checkbox" name="option" value="selected"></input>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProposalView;
