import React, { useState, useEffect } from "react"
import config from '../../config/config';
import '../../assets/styles/productsPage.css'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    index: "",
    category: "",
    price: "",
    image_1: "",
    image_2: "",
    image_3: "",
    image_4: "",
  })
  const [productToEdit, setProductToEdit] = useState(null)

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4ODk4NzM0LCJpYXQiOjE3MzczNjI3MzQsImp0aSI6IjA2OWRkZTA0NWIxZjQ5OGViOWRjZmVmMTQ0YWE4ZDcxIiwidXNlcl9pZCI6MX0.ntJ1lqcs0eddyBAhh3H9Ou9Gl6u-9zv-GTsKhQtkUKg"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/products/`)
        const data = await response.json()
        setProducts(data.data || [])
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setError("Failed to load products")
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/categories/`)
        const data = await response.json()
        setCategories(data.data || [])
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        setError("Failed to load categories")
      }
    }

    fetchProducts()
    fetchCategories()
  }, [])

  const handleCreateProduct = async () => {
    try {
      const formattedProduct = {
        ...newProduct,
        price: typeof newProduct.price === "number" ? newProduct.price.toFixed(2) : newProduct.price,
      }

      const response = await fetch(`${config.API_BASE_URL}/admin-products-create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedProduct),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create product")
      }

      const createdProduct = await response.json()
      setProducts([...products, createdProduct])
      setNewProduct({
        title: "",
        description: "",
        index: "",
        category: "",
        price: "",
        image_1: "",
        image_2: "",
        image_3: "",
        image_4: "",
      })
      console.log("Product created:", createdProduct)
    } catch (error) {
      console.error("Error creating product:", error)
      setError("Failed to create product")
    }
  }

  const handleUpdateProduct = async (productId, productData) => {
    try {
      const formattedProduct = {
        ...productData,
        price: typeof productData.price === "number" ? productData.price.toFixed(2) : productData.price,
      }

      const response = await fetch(`${config.API_BASE_URL}/update-product/${productId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: productId, ...formattedProduct }),
      })

      if (!response.ok) {
        throw new Error("Failed to update product")
      }

      const updatedProduct = await response.json()
      setProducts((prevProducts) => prevProducts.map((p) => (p.id === productId ? updatedProduct : p)))
      setProductToEdit(null)

      console.log("Product updated:", updatedProduct)
    } catch (error) {
      console.error("Error updating product:", error)
      setError("Failed to update product")
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/products/delete/${productId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId))
      console.log("Product deleted:", productId)
    } catch (error) {
      console.error("Error deleting product:", error)
      setError("Failed to delete product")
    }
  }

  if (loading) return <div>Loading products...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="products-container">
      <h2 className="products-title">Products</h2>

      {/* New Product Form */}
      <div className="product-form">
        <h3 className="form-title">Create New Product</h3>
        <div className="form-grid">
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            placeholder="Product Title"
            className="form-input"
          />
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Product Description"
            className="form-input"
          />
          <input
            type="text"
            value={newProduct.index}
            onChange={(e) => setNewProduct({ ...newProduct, index: e.target.value })}
            placeholder="Product Index"
            className="form-input"
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="form-select"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Product Price"
            className="form-input"
            step="0.01"
          />
          <input
            type="text"
            value={newProduct.image_1}
            onChange={(e) => setNewProduct({ ...newProduct, image_1: e.target.value })}
            placeholder="Product Image 1 URL"
            className="form-input"
          />
          <input
            type="text"
            value={newProduct.image_2}
            onChange={(e) => setNewProduct({ ...newProduct, image_2: e.target.value })}
            placeholder="Product Image 2 URL"
            className="form-input"
          />
          <input
            type="text"
            value={newProduct.image_3}
            onChange={(e) => setNewProduct({ ...newProduct, image_3: e.target.value })}
            placeholder="Product Image 3 URL"
            className="form-input"
          />
          <input
            type="text"
            value={newProduct.image_4}
            onChange={(e) => setNewProduct({ ...newProduct, image_4: e.target.value })}
            placeholder="Product Image 4 URL"
            className="form-input"
          />
        </div>
        <button onClick={handleCreateProduct} className="btn btn-primary">
          Create Product
        </button>
      </div>

      {/* Product List */}
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img src={prod.image_1 || ""} alt={prod.title || "Product"} className="product-image" />
              <h4 className="product-title">{prod.title || "No title"}</h4>
              <p className="product-description">{prod.description || "No description"}</p>
              <p className="product-index">{prod.index || "No index"}</p>
              <p className="product-category">Category: {prod.category || "No category"}</p>
              <p className="product-price">${prod.price || "0.00"}</p>
              <div className="product-actions">
                <button onClick={() => setProductToEdit(prod)} className="btn btn-secondary">
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(prod.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Edit Product Modal */}
      {productToEdit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="form-title">Edit Product</h3>
            <div className="form-grid">
              <input
                type="text"
                value={productToEdit.title}
                onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
                placeholder="Product Title"
                className="form-input"
              />
              <input
                type="text"
                value={productToEdit.description}
                onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
                placeholder="Product Description"
                className="form-input"
              />
              <input
                type="text"
                value={productToEdit.index}
                onChange={(e) => setProductToEdit({ ...productToEdit, index: e.target.value })}
                placeholder="Product Index"
                className="form-input"
              />
              <select
                value={productToEdit.category}
                onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
                className="form-select"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={productToEdit.price}
                onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
                placeholder="Product Price"
                className="form-input"
                step="0.01"
              />
              <input
                type="text"
                value={productToEdit.image_1}
                onChange={(e) => setProductToEdit({ ...productToEdit, image_1: e.target.value })}
                placeholder="Product Image 1 URL"
                className="form-input"
              />
              <input
                type="text"
                value={productToEdit.image_2}
                onChange={(e) => setProductToEdit({ ...productToEdit, image_2: e.target.value })}
                placeholder="Product Image 2 URL"
                className="form-input"
              />
              <input
                type="text"
                value={productToEdit.image_3}
                onChange={(e) => setProductToEdit({ ...productToEdit, image_3: e.target.value })}
                placeholder="Product Image 3 URL"
                className="form-input"
              />
              <input
                type="text"
                value={productToEdit.image_4}
                onChange={(e) => setProductToEdit({ ...productToEdit, image_4: e.target.value })}
                placeholder="Product Image 4 URL"
                className="form-input"
              />
            </div>
            <div className="modal-actions">
              <button onClick={() => setProductToEdit(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={() => handleUpdateProduct(productToEdit.id, productToEdit)} className="btn btn-primary">
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage

