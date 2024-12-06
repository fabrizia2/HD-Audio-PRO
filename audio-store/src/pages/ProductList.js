import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/ProductList.css';

function ProductList() {
  const { category } = useParams();
  const filteredProducts = productsData.filter((product) => product.category === category);

  return (
    <div className="product-list-container">
      <Breadcrumb />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`}>
                <button className="view-more-button">View More</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
