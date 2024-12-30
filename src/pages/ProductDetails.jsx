import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import Footer from "../components/Footer.jsx";
import Navigation from "../components/Navigation.jsx";

const ProductDetails = ({ product }) => {
  product = {
    title:
      "2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
    rating: "4.5 Star rating",
    reviews: 320,
    currentPrice: 699,
    originalPrice: 799,
    discount: 13,
    images: [
      "https://clicon-html.netlify.app/image/product/mac.png",
      "https://i.pinimg.com/474x/ca/d6/3a/cad63a1bddd97023cf2e3160b9c1be65.jpg",
      "https://i.pinimg.com/474x/58/86/b8/5886b807be656a2f9bd4f4a42a74d5e5.jpg",
      "https://i.pinimg.com/474x/6d/d0/ce/6dd0ce2702609c9da686f7a29b051dc6.jpg",
      "https://i.pinimg.com/474x/62/9b/ad/629bad8494c58b314c17c4a777948ca0.jpg",
      
      
    ],
    colors: ["#000000", "#FFFFFF", "#FF5733"],
    memoryOptions: ["64 GB", "128 GB", "256 GB"],
    sizeOptions: ["13 inch", "14 inch", "16 inch"],
    storageOptions: ["256 GB", "512 GB", "1 TB"],
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < product.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleQuantityChange = (change) => {
    if (quantity + change > 0) {
      setQuantity(quantity + change);
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        {/* Left: Product Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageContainer}>
            <img
              src={product.images[selectedImageIndex]}
              alt={`Product Image ${selectedImageIndex + 1}`}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailContainer}>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={handlePrevImage}
              disabled={selectedImageIndex === 0}
            >
              &#8592;
            </button>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`${styles.thumbnail} ${
                  index === selectedImageIndex ? styles.activeThumbnail : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNextImage}
              disabled={selectedImageIndex === product.images.length - 1}
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className={styles.detailsSection}>
          <div className={styles.rating}>
            ⭐ {product.rating} ({product.reviews} User feedback)
          </div>
          <h2 className={styles.productTitle}>{product.title}</h2>
          <div>
            <p>Availability: In Stock</p>
            <p>Category: Electronics Devices</p>
          </div>
          <div className={styles.pricingSection}>
            <span className={styles.currentPrice}>${product.currentPrice}</span>
            <span className={styles.originalPrice}>
              ${product.originalPrice}
            </span>
            <span className={styles.discount}>{product.discount}% Off</span>
          </div>
          <hr className={styles.sectionDivider} />
          <div className={styles.optionsSection}>
            <div className={styles.optionGroup1}>
              <p>Color:</p>
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={styles.colorOption}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className={styles.optionGroup}>
              <p>Memory:</p>
              <select className={styles.selectBox}>
                {product.memoryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.optionGroup}>
              <p>Size:</p>
              <select className={styles.selectBox}>
                {product.sizeOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.optionGroup}>
              <p>Storage:</p>
              <select className={styles.selectBox}>
                {product.storageOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.quantitySection}>
            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.addToCartButton}>ADD TO CART</button>
            <button className={styles.buyNowButton}>BUY NOW</button>
          </div>
          <div className={styles.additionalOptions}>
            <button>♡ Add to Wishlist</button>
            <button>Exchange</button>
          </div>
          <div className={styles.paymentOptions}>
            <span>100% Guarantee Safe Checkout</span>
            <img
              src="https://clicon-html.netlify.app/image/payment-method.png"
              alt="Payment Options"
            />
          </div>
        </div>
      </div>
 
      <Footer />
    </>
  );
};

export default ProductDetails;
