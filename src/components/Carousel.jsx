import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

const Carousel = () => {
  const images = [
    './images/1.jpg',
    './images/2.jpg',
    './images/3.jpg',
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
    <div className={styles.carousel}>
      <div className={styles.arrow} onClick={prevImage}>&#10094;</div> 
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className={styles.image} />
      <div className={styles.arrow} onClick={nextImage}>&#10095;</div> 
    </div>
  );
};

export default Carousel;