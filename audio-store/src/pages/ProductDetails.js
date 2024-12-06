import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((product) => product.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', { ...product, quantity });
    addToCart({ ...product, quantity });
    alert(`${quantity} ${product.name}(s) have been added to your cart!`);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details-info">
        <h2>{product.name}</h2>
        <p className="product-details-price">${product.price.toFixed(2)}</p>
        <p className="product-details-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <div className="quantity-control">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <p className="product-details-total-price">
          Total: ${(product.price * quantity).toFixed(2)}
        </p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <Link to={-1} className="back-link">
          <h2>Go Back</h2>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
