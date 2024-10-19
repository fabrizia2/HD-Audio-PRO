import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/ProductList.css';

function ProductList() {
  const { category } = useParams();
  const filteredProducts = productsData.filter((product) => product.category === category);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    console.log('Product to add:', product); // Debug log
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="product-list-container">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
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
