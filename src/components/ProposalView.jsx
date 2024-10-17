import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import '../styles/Lists.css';
import { useInputContext } from '../context/InputsContext';
import { useProposalContext } from '../context/ProposalContext';
import SelectedProposals from './selectedProposals';



const ProposalView = () => {
  
  const [minData, setMinData] = useState([]);
  const [ecoData, setEcoData] = useState([]);
  const { handleInputChange, inputValues, resetInputs } = useInputContext();
  const { proposals, addProposal, resetProposals } = useProposalContext();



  const comprimento = parseFloat(inputValues.comprimento || 0);
  const altura = parseFloat(inputValues.altura || 0);
  const largura = parseFloat(inputValues.largura || 0);
  const formaPagamento = inputValues.formaPagamento
  const parcelas = parseFloat(inputValues.parcelas || 0);
  



  const [pedidoMinimo, setPedidoMinimo] = useState(0);
  const [lote, setLote] = useState(0);  
  const [simples, setSimples] = useState(0);
  const [margem, setMargem] = useState(0);
  const [opcoesData, setOpcoesData] = useState({ lote: null, pedido_minimo: null, simples: null, margem: null });


  const [hasAccess, setHasAccess] = useState(false);


  const [checkboxes, setCheckboxes] = useState({});
  const [dropdowns, setDropdowns] = useState({});

  const [proposalIndex, setProposalIndex] = useState(1);

  const [formattedValues, setFormattedValues] = useState({
    pedidoMinimo: '',
    lote: '',
    simples: '',
    margem: '',
  });

  const formatNumber = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };



  useEffect(() => {
    const storedKey = localStorage.getItem('role');
    setHasAccess(!!storedKey);
  }, []);


  useEffect(() => {
    setCheckboxes({});
    setDropdowns({});
  }, [inputValues]);


  
  


  const calculateFinalValue = (cost) => {
    const simplesPercentual = simples / 100;
    const margemPercentual = margem / 100;
    const costFloat = parseFloat(cost) || 0;
    const finalValue = (costFloat / (1 - simplesPercentual - margemPercentual)).toFixed(3);
    //  console.log(`${costFloat} / (${costFloat} * ${simplesPercentual}) - (${costFloat} * ${margemPercentual}) = ${finalValue}`);
    return finalValue;
  };



  const calculateCost = (onda, precoM2) => {
    if (comprimento === 0 || altura === 0 || largura === 0) {
      return 0;
    }

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
    if (comprimento === 0 || altura === 0 || largura === 0) {
      return 0;
    }
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


 

  const handleCheckboxChange = (productId, isChecked) => {
    setCheckboxes(prev => ({ ...prev, [productId]: isChecked }));
  };

  const handleDropdownChange = (productId, value) => {
    setDropdowns(prev => ({ ...prev, [productId]: value }));
  };


  const handleAddProposal = (product, tipo) => {
    const custo = calculateCost(product['onda'], product['precoM2']);
    const finalValue = calculateFinalValue(custo);
    const quantidade = tipo === 'minimo' ? Math.ceil(pedidoMinimo / custo) : Math.ceil(lote / calculateAreaLote(product['onda']));
    const precoUn = (finalValue / quantidade).toFixed(5);

    const proposal = {
        index: proposalIndex,
        material: product['material'],
        quantidade: quantidade,
        precoUn: precoUn,
        valor: finalValue,
        modalidade: product['categoria'],
        medida: (comprimento + "X" + largura + "X" + altura),
        impressao: checkboxes[product.id] || false,
        modelo: dropdowns[product.id] || 'Não selecionado',
        formaPagamento: formaPagamento,
        parcelas: parcelas,
    };

    addProposal(proposal);
    console.log('Proposta adicionada:', proposal);

    setProposalIndex(prevIndex => prevIndex + 1);
};



  useEffect(() => {
    console.log('Lista completa de propostas:', proposals);
}, [proposals]);


useEffect(() => {
  // Atualiza os valores formatados sempre que os inputs de medidas mudarem
  const pedidoMinimo = formatNumber(/* lógica para calcular pedidoMinimo */);
  const loteFormatted = formatNumber(/* lógica para calcular lote */);
  const simplesFormatted = formatNumber(/* lógica para calcular simples */);
  const margemFormatted = formatNumber(/* lógica para calcular margem */);

  setFormattedValues({
    pedidoMinimo,
    lote: loteFormatted,
    simples: simplesFormatted,
    margem: margemFormatted,
  });
}, [comprimento, altura, largura, lote]);


  return (
    <div className="listWrapper">
      <SelectedProposals/>
      {/* Tabela MÍNIMO */}
      <h2>MÍNIMO</h2>
      <div className="list-container">
        <div className="table-header">
          <div className="table-row">
            <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}><span>CUSTO S/ NF</span></div>
            <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}><span>FORNECEDOR</span></div>
            <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}><span>CUSTO</span></div>
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
            const costWithoutTax = comprimento === 0 || altura === 0 || largura === 0 ? 0 : (custo * 0.93).toFixed(3);
            const quantidade = Math.ceil(pedidoMinimo / custo);


            return (
              <div key={product.id} className="table-row">
                <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}>{formatNumber(costWithoutTax)}</div>
                <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}>{product['fornecedor']}</div>
                <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}>{formatNumber(custo)}</div>
                <div className="table-cell proposalView">{quantidade}</div>
                <div className="table-cell proposalView">{product['material']}</div>

                <div className="table-cell proposalView">
                  <input
                    type="checkbox"
                    checked={checkboxes[product.id] || false}
                    onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                  />
                </div>

                <div className="table-cell proposalView">
                  <select onChange={(e) => handleDropdownChange(product.id, e.target.value)} value={dropdowns[product.id] || ''}>
                    <option value=""></option>
                    <option value="normal">NORMAL</option>
                    <option value="corte-vinco">CORTE E VINCO</option>
                  </select>
                </div>


                <div className="table-cell proposalView">{formatNumber(calculateFinalValue(custo))}</div>

                <div className="table-cell proposalView">
                  <button onClick={() => handleAddProposal(product, 'minimo')}>ADD</button>
                </div>


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
            <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}><span>CUSTO S/ NF</span></div>
            <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}><span>FORNECEDOR</span></div>
            <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}><span>CUSTO</span></div>
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
            const costWithoutTax = comprimento === 0 || altura === 0 || largura === 0 ? 0 : (custo * 0.93).toFixed(3);
            const quantidade = Math.ceil(lote / calculateAreaLote(product['onda']));

            return (
              <div key={product.id} className="table-row">
                <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}>{formatNumber(costWithoutTax)}</div>
                <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}>{product['fornecedor']}</div>
                <div className={`table-cell proposalView ${!hasAccess ? 'blurred' : ''}`}>{formatNumber(custo)}</div>
                <div className="table-cell proposalView">{quantidade}</div>
                <div className="table-cell proposalView">{product['material']}</div>


                <div className="table-cell proposalView">
                  <input
                    type="checkbox"
                    checked={checkboxes[product.id] || false}
                    onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                  />
                </div>

                <div className="table-cell proposalView">
                  <select onChange={(e) => handleDropdownChange(product.id, e.target.value)}>
                    <option value=""></option>
                    <option value="normal">NORMAL</option>
                    <option value="corte-vinco">CORTE E VINCO</option>
                  </select>
                </div>


                <div className="table-cell proposalView">{formatNumber(calculateFinalValue(custo))}</div>
                <div className="table-cell proposalView">
                  <button onClick={() => handleAddProposal(product, 'economico')}>ADD</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default ProposalView;