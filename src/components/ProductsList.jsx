import React from 'react';
import '../styles/productList.css';

const ProductList = () => {
  // Dados fictícios
  const products = [
    {
      supplier: 'Fornecedor A',
      cost: 100,
      quantity: 5,
      material: 'Material A',
      sellingPrice: 150,
    },
    {
      supplier: 'Fornecedor B',
      cost: 120,
      quantity: 10,
      material: 'Material B',
      sellingPrice: 180,
    },
    {
      supplier: 'Fornecedor C',
      cost: 90,
      quantity: 8,
      material: 'Material C',
      sellingPrice: 130,
    },
    {
      supplier: 'Fornecedor D',
      cost: 110,
      quantity: 12,
      material: 'Material D',
      sellingPrice: 160,
    },
    // Adicione mais produtos conforme necessário
  ];

  return (
    <div class="productListWrapper">
        <div className="product-list-container">
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

        {/* Lista de produtos */}
        <div className="table-body">
            {products.map((product, index) => (
            <div key={index} className="table-row">
                <div className="table-cell">{product.cost}</div>
                <div className="table-cell">{product.supplier}</div>
                <div className="table-cell">{product.cost}</div>
                <div className="table-cell">{product.quantity}</div>
                <div className="table-cell">{product.material}</div>
                <div className="table-cell">{product.sellingPrice}</div>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default ProductList;
