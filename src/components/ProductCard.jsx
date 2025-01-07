import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

const categories = [
  { value: "electronics", label: "Electronics Devices" },
  { value: "computers", label: "Computers & Laptops" },
  { value: "accessories", label: "Accessories" },
  { value: "smartphones", label: "Smartphones" },
];

const ProductCard = ({ totalSteps = 7 }) => {
  const [priceRange, setPriceRange] = useState([100, 1000]);

  const handlePriceChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setPriceRange([priceRange[100], value]);
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const products = [
    {
      id: 1,
      name: "Smartphone XYZ",
      description: "Latest smartphone with advanced features.",
      price: "$699",
      detailUrl: "./ProdctDetail",
      img: "./images/z900.jpg",
    },
    {
      id: 2,
      name: "Laptop ABC",
      description: "High-performance laptop for professionals.",
      price: "$999",
      img: "./images/z9002.jpg",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "./images/z9003.jpg",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/21/7b/be/217bbe8121fe653ec9ab50eaec4d2f5a.jpg",
    },
    {
      id: 5,
      img: "",
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/8c/86/bc/8c86bc973584beebc03fa421270d9062.jpg",
    },
    {
      id: 6,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/95/72/6d/95726dbf71539de4c65b61cdfed5e7c7.jpg",
    },
    {
      id: 7,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/bb/f3/55/bbf3558cd63361de2714ae7049d24da9.jpg",
    },
    {
      id: 8,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/ae/43/7c/ae437ce161489caee7014d3afba3d418.jpg",
    },
    {
      id: 9,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/49/72/88/49728884275ec9d7ef90329a055fb38c.jpg",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.aside}>
        <div className={styles.category}>
          <h3>Categories</h3>
          <ul>
            <li>
              <label>
                <input type="radio" name="category" value="electronics" />
                Electronics Devices
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="category" value="computers" />
                Computers & Laptops
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="category" value="accessories" />
                Accessories
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="category" value="smartphones" />
                Smartphones
              </label>
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <div className={styles.priceRange}>
            <h3>Price Range</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className={styles.slider}
            />
            <div className={styles.priceInputs}>
              <input
                type="number"
                value={priceRange[0]}
                readOnly
                className={styles.priceInput}
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value, 10)])
                }
                className={styles.priceInput}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.category1}>
          <ul>
            <li>
              <label>
                <input type="radio" name="price" />
                Price: Low to High
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="price" />
                Price: High to Low
              </label>
            </li>
          </ul>
        </div>
        <hr />
        <div className={styles.category}>
          <h3>Customer Rating</h3>
          <ul>
            <li>
              <label>
                <input type="radio" name="customer" />
                4✩ & above
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="customer" />
                3✩ & above
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="customer" />
                2✩ & above
              </label>
            </li>
          </ul>
        </div>
        <hr />

        <div className={styles.category}>
          <h3>Offers</h3>
          <ul>
            <li>
              <label>
                <input type="radio" name="offer" />
                Buy more, Save more
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="offer" />
                Special Price
              </label>
            </li>
          </ul>
        </div>
        <div className={styles.bannerContainer}>
        <img className={styles.Banner} src="./images/banner1.png" alt="" />

        </div>
      </div>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <a href="./ProductDetails">
              <img
                src={product.img}
                alt={product.name}
                className={styles.productImage}
              />
            </a>
            <h4 className={styles.productName}>{product.name}</h4>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>{product.price}</p>
          </div>
        ))}
        <div className={styles.pagination}>
          <div className={styles.paginationContainer}>
            <button
              className={`${styles.navButton} ${styles.leftButton}`}
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              &#8592;
            </button>

            {Array.from({ length: totalSteps }, (_, index) => {
              const step = index + 1;
              return (
                <button
                  key={step}
                  className={`${styles.stepButton} ${
                    step === currentStep ? styles.activeStep : ""
                  }`}
                  onClick={() => setCurrentStep(step)}
                >
                  {`0${step}`.slice(-2)}
                </button>
              );
            })}

            <button
              className={`${styles.navButton} ${styles.rightButton}`}
              onClick={handleNext}
              disabled={currentStep === totalSteps}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  priceRange: PropTypes.arrayOf(PropTypes.number),
  setPriceRange: PropTypes.func,
};

export default ProductCard;
