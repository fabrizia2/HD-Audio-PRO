import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../utils/api'; // Ensure correct import path
import config from '../../config/config';

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', category: '', price: '', image: '' });
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/products/`);
        const data = await response.json();
        setProducts(data.data || []); // Ensure 'data' exists and is an array
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const response = await createProduct(newProduct);
      console.log('Product created:', response);
      setProducts([...products, response]);
      setNewProduct({ title: '', description: '', category: '', price: '', image: '' });
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await updateProduct(productToEdit.id, productToEdit);
      console.log('Product updated:', response);
      setProducts(products.map(prod => (prod.id === productToEdit.id ? response : prod)));
      setProductToEdit(null);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>

      {/* New Product Form */}
      <div>
        <h3>Create New Product</h3>
        <input
          type="text"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          placeholder="Product Title"
        />
        <input
          type="text"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Product Description"
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {/* Populate with categories when they are available */}
        </select>
        <input
          type="text"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Product Price"
        />
        <input
          type="text"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          placeholder="Product Image URL"
        />
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>

      {/* Edit Product Form */}
      {productToEdit && (
        <div>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={productToEdit.title}
            onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
            placeholder="Product Title"
          />
          <input
            type="text"
            value={productToEdit.description}
            onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
            placeholder="Product Description"
          />
          <select
            value={productToEdit.category}
            onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {/* Populate with categories when they are available */}
          </select>
          <input
            type="text"
            value={productToEdit.price}
            onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
            placeholder="Product Price"
          />
          <input
            type="text"
            value={productToEdit.image}
            onChange={(e) => setProductToEdit({ ...productToEdit, image: e.target.value })}
            placeholder="Product Image URL"
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}

      {/* Product List */}
      <div>
        <h3>Product List</h3>
        <ul>
          {products && products.length > 0 ? (
            products.map(prod => (
              <li key={prod.id}>
                <h4>{prod.title}</h4>
                <p>{prod.description}</p>
                <p>Category: {prod.category}</p>
                <p>Price: ${prod.price}</p>
                <img src={prod.image} alt={prod.title} style={{ width: '100px' }} />
                <button onClick={() => setProductToEdit(prod)}>Edit</button>
              </li>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
