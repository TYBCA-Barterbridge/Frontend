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

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center relative m-10">
      <div 
        className="cursor-pointer text-3xl text-white bg-gray-500 bg-opacity-10 p-2 select-none" 
        onClick={prevImage}
      >
        &#10094;
      </div>
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`} 
        className="w-screen h-[300px] object-cover mx-2"
      />
      <div 
        className="cursor-pointer text-3xl text-white bg-gray-500 bg-opacity-10 p-2 select-none" 
        onClick={nextImage}
      >
        &#10095;
      </div>
    </div>
  );
};

export default Carousel;
