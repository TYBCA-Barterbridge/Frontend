import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const images = [
    './images/1.jpg',
    './images/2.jpg',
    './images/4.jpg',
    './images/5.jpg',
    './images/6.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const nextImage = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsSliding(false);
    }, 500);
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsSliding(false);
    }, 500);
  };

  const prevImage = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setIsSliding(false);
    }, 500);
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setIsSliding(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center relative m-10 overflow-hidden">
      <button 
        className="absolute left-2 cursor-pointer text-3xl text-white bg-gray-500 bg-opacity-10  p-2 w-13 rounded-full select-none z-10 hover:scale-[1.09] transition-transform duration-300" 
    <div className="flex items-center justify-center relative m-10 overflow-hidden">
      <button 
        className="absolute left-2 cursor-pointer text-3xl text-white bg-gray-500 bg-opacity-10  p-2 w-13 rounded-full select-none z-10 hover:scale-[1.09] transition-transform duration-300" 
        onClick={prevImage}
      >
        &#10094;
      </button>
      <div className="relative w-screen  h-[350px] flex justify-center items-center overflow-hidden">
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
      <button 
        className="absolute right-2 cursor-pointer text-3xl text-white bg-gray-500 bg-opacity-20 p-2 w-13 rounded-full select-none z-10 hover:scale-[1.03] transition-transform duration-100" 
      <button 
        className="absolute right-2 cursor-pointer text-3xl text-white bg-gray-500 bg-opacity-20 p-2 w-13 rounded-full select-none z-10 hover:scale-[1.03] transition-transform duration-100" 
        onClick={nextImage}
      >
        &#10095;
      </button>
      </button>
    </div>
  );
};

export default Carousel;