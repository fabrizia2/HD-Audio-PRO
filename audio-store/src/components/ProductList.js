import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/fetchProducts';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    
    loadProducts();
  }, []);

  console.log("ProductList data:", ProductList);
console.log("Type of ProductList:", typeof ProductList);
console.log("Is ProductList an Array?", Array.isArray(ProductList));

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>Index:</strong> {product.index}</p> {/* Displays Index */}
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              {product.images.length > 0 && (
                <img src={product.images[0]} alt={product.title} width="100" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
