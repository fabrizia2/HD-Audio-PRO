import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/ProductDetails.css";
import Carousel from "../components/Carousel";
import { fetchProducts } from "../utils/fetchProducts"; // Fetching function

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const products = await fetchProducts(); // Fetch all products
      const foundProduct = products.find((p) => p.id === parseInt(id)); // Find product by ID
      setProduct(foundProduct);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;

  if (!product) {
    return <p>Product not found.</p>;
  }

  const price = Number.parseFloat(product.price);
  

  return (
    <div>
      <div className="product-details-container">
        {/* Carousel Section */}
        <div className="product-details-carousel">
          <Carousel images={product.images} autoSlideInterval={5000} />
        </div>

        {/* Product Information Section */}
        <div className="product-details-info">
          <h2 className="title">{product.title}</h2>
          <p className="product-details-price text-xl font-semibold mb-2">
            <span className="current-price">
              Ksh. {price.toLocaleString()}
            </span>
          
            {/* Only show 'was' price if it exists and is different from the current price */}
            {product.was && product.was > price && (
              <span className="was-price ml-2 line-through text-lg font-normal text-gray-500">
                Ksh. {product.was.toLocaleString()}
              </span>
            )}
          </p>


          <h3>PRODUCT DESCRIPTION</h3>
          <p className="product-details-description mb-4">{product.description}</p>
          <Link to="/contact" className="add-to-cart-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4">
            ORDER NOW
          </Link>
        </div>
      </div>
      <div className="product-details-container">
        <h3>PRODUCT INDEX</h3>
        <p className="product-details-description mb-4">{product.index}</p>

        {/* Add to Cart Button (Disabled in Static Mode) */}
        <Link to="/contact" className="add-to-cart-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4">
          ORDER NOW
        </Link>

        {/* Go Back Link */}
        <Link to={-1} className="back-link text-blue-500 hover:underline">
          <h2>Back To Products</h2>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
