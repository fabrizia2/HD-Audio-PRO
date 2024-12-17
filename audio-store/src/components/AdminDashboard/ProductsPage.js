import React, { useState, useEffect } from 'react';
import config from '../../config/config';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newProduct, setNewProduct] = useState({
      title: '',
      description: '',
      category: '',
      price: '',
      image: ''
    });
    const [productToEdit, setProductToEdit] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/products/`);
        const data = await response.json();
        console.log('Fetched products:', data); // Log the fetched products
        setProducts(data.data || []); // Ensure 'data' exists and is an array
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
        try {
          const response = await fetch(`${config.API_BASE_URL}/categories/`);
          const data = await response.json();
          setCategories(data.data || []);
        } catch (error) {
          console.error('Failed to fetch categories:', error);
          setError('Failed to load categories');
        }
      };
  
      fetchProducts();
      fetchCategories();
    }, []);

  // Create product function
  const handleCreateProduct = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/admin-products-create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      setNewProduct({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
      });
      console.log('Product created:', createdProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product');
    }
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0OTcxMTgxLCJpYXQiOjE3MzM0MzUxODEsImp0aSI6IjQxNDAxZDliNWI0YTQ1ZDE5NWNjOWMzMWZhODhmZDg2IiwidXNlcl9pZCI6Mn0.KiJUAxz6aRtHUqLArEloEC8qYUQKhtB86NebB5DzwGY';

  // Update product function
  const handleUpdateProduct = async (productId, productData) => {
    try {
  
      // Send the update request
      const response = await fetch(`${config.API_BASE_URL}/update-product/${productId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the Authorization header with Bearer token
        },
        body: JSON.stringify({ id: productId, ...productData }),
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
  
      // Parse the response data (updated product)
      const updatedProduct = await response.json();
  
      // Update the local state with the updated product
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? updatedProduct : p))
      );
  
      // Reset the productToEdit state to null or handle accordingly
      setProductToEdit(null);
  
      console.log('Product updated:', updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
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
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
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
          <button onClick={() => handleUpdateProduct(productToEdit.id, productToEdit)}>Update Product</button>
        </div>
      )}

      {/* Product List */}
      <div>
        <h3>Product List</h3>
        <ul>
          {products && products.length > 0 ? (
            products.map((prod, index) => (
              <li key={index}>
                <h4>{prod.title || 'No title'}</h4>
                <p>{prod.description || 'No description'}</p>
                <p>Category: {prod.category || 'No category'}</p>
                <p>Price: ${prod.price || 'No price'}</p>
                <img src={prod.image || ''} alt={prod.title || 'No image'} style={{ width: '100px' }} />
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