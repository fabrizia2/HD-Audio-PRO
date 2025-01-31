import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "../styles/ProductDetails.css"
import config from "../config/config"
import Carousel from "../components/Carousel"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/product-detail/${id}`)

        if (!response.ok) {
          throw new Error(`Product not found with ID: ${id}`)
        }

        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json()
          console.log("Fetched product:", data)
          setProduct(data)
        } else {
          const text = await response.text()
          console.error("Error: Expected JSON but got HTML:", text)
          throw new Error("Expected JSON but got HTML, possibly an error page.")
        }
      } catch (error) {
        setError(error.message)
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [id])

  if (error) {
    return <p>{error}</p>
  }

  if (!product) {
    return <p>Loading product...</p>
  }

  const price = Number.parseFloat(product.price)
  const totalPrice = price * quantity

  if (isNaN(price)) {
    return <p>Invalid product price.</p>
  }

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      price,
      quantity,
    }
    console.log("Adding to cart:", productToAdd)
    addToCart(productToAdd)
    alert(`${quantity} ${product.title}(s) have been added to your cart!`)
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const productImages = product.image_urls || []
  console.log("Product Images:", productImages)

  return (
    <div className="product-details-container">
      {/* Carousel Section */}
      <div className="product-details-carousel">
        <Carousel images={productImages} autoSlideInterval={5000} />
      </div>

      {/* Product Information Section */}
      <div className="product-details-info">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="product-details-price text-xl font-semibold mb-2">Ksh.{price.toFixed(2)}</p>
        <h3>PRODUCT DESCRIPTION</h3>
        <p className="product-details-description mb-4">{product.description}</p>

        <h3>PRODUCT INDEX</h3>
        <p className="product-details-description mb-4">{product.index}</p>
        {/* Quantity Control */}
        <div className="quantity-control flex items-center mb-4">
          <button onClick={handleDecrement} className="px-3 py-1 bg-gray-200 rounded-l">
            -
          </button>
          <span className="px-4 py-1 bg-gray-100">{quantity}</span>
          <button onClick={handleIncrement} className="px-3 py-1 bg-gray-200 rounded-r">
            +
          </button>
        </div>

        {/* Total Price */}
        <p className="product-details-total-price text-lg font-semibold mb-4">Total: Ksh.{totalPrice.toFixed(2)}</p>

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        {/* Go Back Link */}
        <Link to={-1} className="back-link text-blue-500 hover:underline">
          <h2>Go Back</h2>
        </Link>
      </div>
    </div>
  )
}

export default ProductDetails

