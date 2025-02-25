import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../utils/fetchProducts';
import "../styles/ProductList.css";

const ProductsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((prod) => prod.category === category);

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/categories')}>← Back to Categories</button>
      <h2>{category} Products</h2>
      <div className='product-grid'>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.images[0]?.split(",")[0].trim()}  
              alt={product.title} 
              style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
            />

            <h3>{product.title}</h3>
            <p>Price: Ksh.{product.price}</p>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <button style={{ background: 'black', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
                View More Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
