// src/pages/Products.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/Products.css';

const categories = [
  {
    id: 1,
    name: 'Speakers',
    description: 'High-quality speakers for all your audio needs.',
    image: require('../assets/images/speaker2.jpg'), // Ensure correct path
    path: 'speakers',
  },
  {
    id: 2,
    name: 'Amplifiers',
    description: 'Powerful amplifiers for professional sound.',
    image: require('../assets/images/amp2.jpg'), // Ensure correct path
    path: 'amplifiers',
  },
  {
    id: 3,
    name: 'Microphones',
    description: 'Wide range of microphones for various applications.',
    image: require('../assets/images/mic1.jpg'), // Ensure correct path
    path: 'microphones',
  },
  {
    id: 4,
    name: 'Microphone Racks',
    description: 'Durable racks to keep your microphones organized.',
    image: require('../assets/images/Designer (1).jpeg'), // Ensure correct path
    path: 'microphone-racks',
  },
  {
    id: 5,
    name: 'Microphone Cases',
    description: 'Protective cases for safe transportation.',
    image: require('../assets/images/Designer.jpeg'), // Ensure correct path
    path: 'microphone-cases',
  },
  {
    id: 6,
    name: 'Power Distributors',
    description: 'Reliable power distributors for consistent performance.',
    image: require('../assets/images/distributor1.jpg'), // Ensure correct path
    path: 'power-distributors',
  },
];

function Products() {
  const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(`/products/${path}`);
  };

  return (
    <div className="products-container">
      <Breadcrumb />
      <div className="category-grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-card" 
            onClick={() => handleCategoryClick(category.path)}
            role="button" // Add role for accessibility
            tabIndex={0} // Make it focusable for keyboard navigation
            onKeyPress={(e) => e.key === 'Enter' && handleCategoryClick(category.path)} // Handle keyboard navigation
          >
            <img 
              src={category.image} 
              alt={`${category.name} - ${category.description}`} // More descriptive alt text
              className="category-image" 
            />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
