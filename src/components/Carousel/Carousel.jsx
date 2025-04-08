import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "./images/banner-1.png",
    "./images/banner-2.png",
    "./images/banner-2 copy.png",
    "./images/banner.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-center relative m-4 sm:m-10 overflow-hidden"
      data-aos="fade-up"
    >
      {/* Left Arrow */}
      <button
        className="absolute left-2 cursor-pointer text-2xl sm:text-3xl text-white bg-gray-500 bg-opacity-10 p-2 sm:p-3 w-10 sm:w-13 rounded-full select-none z-10 hover:scale-[1.09] transition-transform duration-300"
        onClick={prevImage}
      >
        &#10094;
      </button>

      {/* Image Slider */}
      <div className="relative w-full sm:w-screen rounded-lg h-[200px] sm:h-[450px] flex justify-center items-center overflow-hidden">
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-2 cursor-pointer text-2xl sm:text-3xl text-white bg-gray-500 bg-opacity-20 p-2 sm:p-3 w-10 sm:w-13 rounded-full select-none z-10 hover:scale-[1.03] transition-transform duration-100"
        onClick={nextImage}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
