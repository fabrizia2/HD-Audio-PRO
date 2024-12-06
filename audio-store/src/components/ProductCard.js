import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Breadcrumb />
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </div>
    </div>
  );
}

export default ProductCard;
