// ProductCarousel.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCarousel.module.css";

const ProductCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("");

  const products = [
    {
      name: "Product 1",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
    {
      name: "Product 2",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
    {
      name: "Product 3",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
    {
      name: "Product 4",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
    {
      name: "Product 5",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
    {
      name: "Product 6",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
    {
      name: "Product 7",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
    {
      name: "Product 8",
      image: "./public/images/z9001.png",
      link: "/product/1",
    },
  ];

  const handleNext = () => {
    if (startIndex + 5 < products.length) {
      setTransitionDirection("next");
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setTransitionDirection("prev");
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
    <div className={styles.carouselContainer}>
      <button
        className={styles.arrowButton}
        onClick={handlePrev}
        disabled={startIndex === 0}
      >
        &#8592;
      </button>
      <div
        className={`${styles.productRow} ${
          transitionDirection === "next" ? styles.slideNext : ""
        } ${transitionDirection === "prev" ? styles.slidePrev : ""}`}
        onAnimationEnd={() => setTransitionDirection("")}
      >
        {products.slice(startIndex, startIndex + 5).map((product, index) => (
          
          <div key={index} className={styles.productItem}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <p className={styles.productName}>{product.name}</p>
          </div>
        ))}
      </div>
      <button
        className={styles.arrowButton}
        onClick={handleNext}
        disabled={startIndex + 5 >= products.length}
      >
        &#8594;
      </button>
    </div>
    </>
  );
};

export default ProductCarousel;
