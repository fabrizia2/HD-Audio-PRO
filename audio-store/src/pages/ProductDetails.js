import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((product) => product.id === parseInt(id)); // Ensure ID match
  const { addToCart } = useCart();

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', product); // Debug log
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details-info">
        <h2>{product.name}</h2>
        <p className="product-details-price">${product.price.toFixed(2)}</p>
        <p className="product-details-category">{product.category}</p>
        <p className="product-details-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
