import React from "react"
import { Link } from "react-router-dom"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  // Function to get the first available image
  const getFirstImage = () => {
    if (product.image_urls && product.image_urls.length > 0) {
      return product.image_urls[0]
    } else if (product.image_1) {
      return product.image_1
    } else if (product.image) {
      return product.image
    }
    return "/placeholder.svg"
  }

  const firstImage = getFirstImage()

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={firstImage || "/placeholder.svg"}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg"
          }}
        />
      </div>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">Ksh.{Number.parseFloat(product.price).toFixed(2)}</p>
      <Link to={`/product/${product.id}`}>
        <button className="view-more-button">Buy Now</button>
      </Link>
    </div>
  )
}

export default ProductCard

