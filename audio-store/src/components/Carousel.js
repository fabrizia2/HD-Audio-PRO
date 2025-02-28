import React, { useState } from "react";
import "./Carousel.css"; // Import the CSS file

const Carousel = ({ images }) => {
  // Ensure images is an array, even if provided as a comma-separated string
  const formattedImages = Array.isArray(images)
    ? images.length === 1 && typeof images[0] === "string"
      ? images[0].split(",").map((url) => url.trim()) // Split if single string
      : images
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === formattedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? formattedImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (!formattedImages || formattedImages.length === 0) {
    return (
      <div className="carousel-container">
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      {/* Image Display */}
      <img
        src={formattedImages[currentIndex] || "/placeholder.svg"}
        alt={`Product ${currentIndex + 1}`}
        className="carousel-image"
      />

      {formattedImages.length > 1 && (
        <>
          {/* Previous Button */}
          <button onClick={goToPrev} className="carousel-button carousel-button-left">
            ❮
          </button>

          {/* Next Button */}
          <button onClick={goToNext} className="carousel-button carousel-button-right">
            ❯
          </button>

          {/* Dots for navigation */}
          <div className="carousel-dots">
            {formattedImages.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`carousel-dot ${currentIndex === slideIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
