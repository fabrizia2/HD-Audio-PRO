import React, { useState, useEffect, useCallback } from "react"

const Carousel = ({ images, autoSlideInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  useEffect(() => {
    const slideInterval = setInterval(goToNext, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [goToNext, autoSlideInterval])


  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p>No image available</p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <img
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`Product ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            {images.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`text-xl cursor-pointer mx-1 ${
                  currentIndex === slideIndex ? "text-blue-500" : "text-gray-400"
                }`}
              >
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Carousel

