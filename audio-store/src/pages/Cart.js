import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css'; // Create this file for styling

function Cart() {
  const { cart } = useCart();
  console.log('Cart contents:', cart); // Log the cart contents

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.image} alt={product.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
