import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";

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
      "./images/z900.jpg",
      "./images/z9001.png",
      "./images/z9002.jpg",
      "./images/z9003.jpg",
    ],

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

  const [activeTab, setActiveTab] = useState("Description");
  const tabData = {
    Description: `
      The most powerful MacBook Pro ever is here. With the blazing-fast M1
      Pro or M1 Max chip — the first Apple silicon designed for pros — you
      get groundbreaking performance and amazing battery life. Add to that
      a stunning Liquid Retina XDR display, the best camera and audio ever
      in a Mac notebook, and all the ports you need. The first notebook of
      its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional
      performance of the M1 architecture to a whole new level for pro users.
      
      Even the most ambitious projects are easily handled with up to 10
      CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and
      dedicated encode and decode media engines that support H.264, HEVC,
      and ProRes codecs.
      The most powerful MacBook Pro ever is here. With the blazing-fast M1
      Pro or M1 Max chip — the first Apple silicon designed for pros — you
      get groundbreaking performance and amazing battery life. Add to that
      a stunning Liquid Retina XDR display, the best camera and audio ever
      in a Mac notebook, and all the ports you need. The first notebook of
      its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional
      performance of the M1 architecture to a whole new level for pro users.
      
      Even the most ambitious projects are easily handled with up to 10
      CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and
      dedicated encode and decode media engines that support H.264, HEVC,
      and ProRes codecs.
    `,
    "Additional Information": `
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
    `,
    Specification: `
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
    `,
  };

  return (
    <>
      <div className={styles.top}>.</div>
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
          <div className={styles.chatButtonContainer}>
            <button className={styles.chatButton}>Chat with Seller</button>
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
            <p>Category: {product.category}</p>
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

      {/* Tabs Section */}
      <div className={styles.descriptionSection}>
        <div className={styles.tabs}>
          {["Description", "Additional Information", "Specification"].map(
            (tab) => (
              <div
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.activeTab : styles.inactiveTab
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            )
          )}
        </div>
        <div className={styles.contentGrid}>
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>{activeTab}</h2>
            <p className={styles.tabDescription}>{tabData[activeTab]}</p>
          </div>
        </div>
      </div>
      <ProductCarousel/>
    </>
  );
};

export default ProductDetails;
