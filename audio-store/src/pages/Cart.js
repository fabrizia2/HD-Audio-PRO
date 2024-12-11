import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    shippingAddress: '',
    billingAddress: '',
    paymentPhoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // Implement the checkout logic here
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul className="cart-items-list">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <img src={item.image_url} alt={item.title} className="cart-item-image" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="cart-summary">
          <p>Total Price: ${calculateTotalPrice()}</p>
        </div>
      </div>
      <div className="order-form">
        <h2>Complete your order</h2>
        <form onSubmit={handleCheckout} className="form">
          <div className="personal-details">
            <h3>Personal Details</h3>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="shippingAddress"
                placeholder="Enter Shipping Address"
                value={formData.shippingAddress}
                onChange={handleChange}
              />
              <input
                type="text"
                name="billingAddress"
                placeholder="Enter Billing Address"
                value={formData.billingAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="paymentPhoneNumber"
                placeholder="Enter Payment Phone Number"
                value={formData.paymentPhoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <h3>Choose Payment Provider</h3>
          <div className="payment-providers">
            <img src="https://www.unitedwomensacco.co.ke/wp-content/uploads/2020/02/MPESA.png" alt="M-Pesa" />
            <img src="https://pluspng.com/img-png/airtel-logo-png-airtel-reveals-new-global-identity-855.jpg" alt="Airtel" />
          </div>
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={() => alert('Cancel')}>
              Cancel
            </button>
            <button type="submit" className="complete-purchase-button">
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
