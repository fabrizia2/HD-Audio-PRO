import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';
import config from '../config/config';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); // Removed clearCart from destructuring
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
  
    try {
      const totalAmount = calculateTotalPrice(); // Calculate the total price
  
      // Format the phone number (e.g., convert "0781394059" to "254781394059")
      const formattedPhoneNumber = `254${formData.phoneNumber.slice(1)}`;
  
      // Prepare the payload
      const payload = {
        amount: parseFloat(totalAmount), // Ensure amount is a number
        payer_phone: formattedPhoneNumber, // Use formatted phone number
        payer_email: formData.email, // Use email from form data
        tx_ref: `cart-payment-${Date.now()}`, // Add a unique transaction reference
        redirect_url: `${window.location.origin}/payment-success`, // Add redirect URL
      };
  
      console.log('Sending payload to backend:', payload); // Debugging
  
      // Send payment details to the backend
      const response = await fetch(`${config.API_BASE_URL}/mpesa-payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      console.log('Backend response:', response); // Debugging
  
      if (!response.ok) {
        // Log the response body for more details
        const errorResponse = await response.json();
        console.error('Backend error response:', errorResponse);
        throw new Error('Payment failed');
      }
  
      const result = await response.json();
      console.log('Payment API result:', result); // Debugging
  
      // Check if the payment_link is available in the response
      if (result.payment_link) {
        // Redirect user to the Flutterwave payment link
        window.location.href = result.payment_link;
      } else {
        throw new Error('Payment link not found in the response');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
                    <p>Price: Ksh.{item.price.toFixed(2)}</p>
                    <p>Total: Ksh.{(item.price * item.quantity).toFixed(2)}</p>
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
          <p>Total Price: Ksh.{calculateTotalPrice()}</p>
        </div>
      </div>
      <div className="order-form">
        <h2>Complete your order</h2>
        <form onSubmit={handleCheckout} className="form">
          <div className="personal-details">
            <h3>Personal Details</h3>
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
          </div>
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={() => alert('Cancel')}>
              Cancel
            </button>
            <button type="submit" className="complete-purchase-button" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
