import React, { useState } from 'react';

// Sample local product data
const sampleProducts = [
  {
    id: 1,
    title: 'Wireless Speaker',
    description: 'High-quality wireless speaker with deep bass.',
    category: 'Speakers',
    price: '120',
    images: 'https://via.placeholder.com/100'
  },
  {
    id: 2,
    title: 'Studio Microphone',
    description: 'Professional-grade microphone for studio recording.',
    category: 'Microphones',
    price: '250',
    images: 'https://via.placeholder.com/100'
  }
];

const sampleCategories = ['Speakers', 'Microphones', 'Amplifiers', 'Accessories'];

const ProductsPage = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [categories] = useState(sampleCategories);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    images: ''
  });
  const [productToEdit, setProductToEdit] = useState(null);

  const handleCreateProduct = () => {
    const newEntry = { id: products.length + 1, ...newProduct };
    setProducts([...products, newEntry]);
    setNewProduct({ title: '', description: '', category: '', price: '', images: '' });
  };

  const handleUpdateProduct = () => {
    setProducts(products.map((p) => (p.id === productToEdit.id ? productToEdit : p)));
    setProductToEdit(null);
  };

  return (
    <div>
      <h2>Products</h2>

      <div>
        <h3>Create New Product</h3>
        <input type="text" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} placeholder="Product Title" />
        <input type="text" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product Description" />
        <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Product Price" />
        <input type="text" value={newProduct.images} onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })} placeholder="Product images URL" />
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>

      {productToEdit && (
        <div>
          <h3>Edit Product</h3>
          <input type="text" value={productToEdit.title} onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })} placeholder="Product Title" />
          <input type="text" value={productToEdit.description} onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })} placeholder="Product Description" />
          <select value={productToEdit.category} onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <input type="text" value={productToEdit.price} onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })} placeholder="Product Price" />
          <input type="text" value={productToEdit.images} onChange={(e) => setProductToEdit({ ...productToEdit, images: e.target.value })} placeholder="Product images URL" />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}

      <div>
        <h3>Product List</h3>
        <ul>
          {products.length > 0 ? (
            products.map((prod) => (
              <li key={prod.id}>
                <h4>{prod.title}</h4>
                <p>{prod.description}</p>
                <p>Category: {prod.category}</p>
                <p>Price: ${prod.price}</p>
                <img src={prod.images} alt={prod.title} style={{ width: '100px' }} />
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
