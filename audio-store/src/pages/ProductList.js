import React, { useEffect, useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import useProducts from "../data/products"
import Breadcrumb from "../components/Breadcrumb"
import ProductCard from "../components/ProductCard"
import "../styles/ProductList.css"

function ProductList() {
  const { category } = useParams()
  const { products, loading, error } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState([])

  console.log("Category:", category)

  useEffect(() => {
    if (category) {
      const filtered = products.filter((product) => product.category.toString() === category)
      console.log("Filtered products:", filtered)
      setFilteredProducts(filtered)
    }
  }, [products, category])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!category) {
    return <Navigate to="/products/speakers" />
  }

  return (
    <div className="product-list-container">
      <Breadcrumb />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  )
}

export default ProductList