import React, { useState } from "react";

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
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Image Display */}
      <img
        src={formattedImages[currentIndex] || "/placeholder.svg"}
        alt={`Product ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {formattedImages.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="button absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full mr-6"
          >
            ❮
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="button absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-white p-2 rounded-full"
          >
            ❯
          </button>

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
