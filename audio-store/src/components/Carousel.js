import React, { useState, useEffect, useCallback } from "react";

const Carousel = ({ images, autoSlideInterval = 5000 }) => {
  // Ensure images is an array, even if provided as a comma-separated string
  const formattedImages = Array.isArray(images)
    ? images.length === 1 && typeof images[0] === "string"
      ? images[0].split(",").map((url) => url.trim()) // Split if single string
      : images
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === formattedImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [formattedImages.length]);

  useEffect(() => {
    if (formattedImages.length > 1) {
      const slideInterval = setInterval(goToNext, autoSlideInterval);
      return () => clearInterval(slideInterval);
    }
  }, [goToNext, autoSlideInterval, formattedImages.length]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (!formattedImages || formattedImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <img
        src={formattedImages[currentIndex] || "/placeholder.svg"}
        alt={`Product ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />
      
      {formattedImages.length > 1 && (
        <>
          {/* Dots for navigation */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            {formattedImages.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                  currentIndex === slideIndex ? "bg-blue-500" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
