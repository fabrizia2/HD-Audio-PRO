import React from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../data/categories';
import "../styles/prod.css";

const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="title">Select a Category</h2>
      <div className="grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card" onClick={() => navigate(`/products/${category.name}`)}>
            <img src={category.image} alt={category.name} className="category-image" />
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
