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

  const simples = parseFloat(inputValues.simples || 0);
  const margem = parseFloat(inputValues.margem || 0);
  const comprimento = parseFloat(inputValues.comprimento || 0);
  const altura = parseFloat(inputValues.altura || 0);
  const largura = parseFloat(inputValues.largura || 0);


  const [pedidoMinimo, setPedidoMinimo] = useState(0);
  const [lote, setLote] = useState(0);  
  const [opcoesData, setOpcoesData] = useState({ lote: null, pedido_minimo: null });



  const calculateFinalValue = (cost) => {
    const simplesPercentual = simples / 100;
    const margemPercentual = margem / 100;

    const costFloat = parseFloat(cost) || 0;
    
     const finalValue = (costFloat / (1 - simplesPercentual - margemPercentual)).toFixed(2);


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
          // console.log('Dados das opções:', data);
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
        const costWithoutTax = (custo * 0.93).toFixed(2);
        const quantidade = Math.ceil(pedidoMinimo / custo);
        const finalValue = calculateFinalValue(custo);
        const precoUn = (finalValue > 0 ? (quantidade / finalValue) : 0).toFixed(2);

        const proposal = {
          index: index + 1, // Nº começando em 1
          material: product['material'],
          quantidade: quantidade,
          precoUn: precoUn,
          valor: finalValue
        };

        proposals.push(proposal);
      });

      // Coletando dados para a tabela ECONÔMICO
      ecoData.forEach((product, index) => {
        const custo = calculateCost(product['onda'], product['precoM2']);
        const costWithoutTax = (custo * 0.93).toFixed(2);
        const quantidade = Math.ceil(pedidoMinimo / custo);
        const finalValue = calculateFinalValue(custo);
        const precoUn = (finalValue > 0 ? (quantidade / finalValue) : 0).toFixed(2);

        const proposal = {
          index: minData.length + index + 1, // Continuando a numeração
          material: product['material'],
          quantidade: quantidade,
          precoUn: precoUn,
          valor: finalValue,
        };

        proposals.push(proposal);
      });

      // Salvando propostas no contexto
      proposals.forEach(proposal => {
        addProposal(proposal);
      });
    };

    // Chama a função sempre que as variáveis que afetam os cálculos mudarem
    handleSaveProposal();
  }, [minData, ecoData, simples, margem, comprimento, altura, largura, pedidoMinimo]);

  return (
    <div className="listWrapper" id="print">
      {/* Tabela MÍNIMO */}
      <h2>MÍNIMO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell"><span>CUSTO S/ NF</span></div>
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>CUSTO</span></div>
            <div className="table-cell"><span>QUANTIDADE</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>VALOR DE VENDA</span></div>
          </div>
        </div>
        <div className="table-body">
          {minData.map((product) => {
            const custo = calculateCost(product['onda'], product['precoM2']);
            const costWithoutTax = (custo * 0.93).toFixed(2);
            const quantidade = Math.ceil(pedidoMinimo / custo);


            return (
              <div key={product.id} className="table-row">
                <div className="table-cell">{costWithoutTax}</div>
                <div className="table-cell">{product['fornecedor']}</div>
                <div className="table-cell">{custo.toFixed(2)}</div>
                <div className="table-cell">{quantidade}</div>
                <div className="table-cell">{product['material']}</div>
                <div className="table-cell">{calculateFinalValue(custo)}</div>
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
            <div className="table-cell"><span>CUSTO S/ NF</span></div>
            <div className="table-cell"><span>FORNECEDOR</span></div>
            <div className="table-cell"><span>CUSTO</span></div>
            <div className="table-cell"><span>QUANTIDADE</span></div>
            <div className="table-cell"><span>MATERIAL</span></div>
            <div className="table-cell"><span>VALOR DE VENDA</span></div>
          </div>
        </div>
        <div className="table-body">
          {ecoData.map((product) => {
            const custo = calculateCost(product['onda'], product['precoM2']);
            const costWithoutTax = (custo * 0.93).toFixed(2);
            const quantidade = Math.ceil(pedidoMinimo / custo);

            return (
              <div key={product.id} className="table-row">
                <div className="table-cell">{costWithoutTax}</div>
                <div className="table-cell">{product['fornecedor']}</div>
                <div className="table-cell">{custo.toFixed(2)}</div>
                <div className="table-cell">{quantidade}</div>
                <div className="table-cell">{product['material']}</div>
                <div className="table-cell">{calculateFinalValue(custo)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProposalView;
