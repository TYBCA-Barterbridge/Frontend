import React from "react";
import styles from "./Wishlist.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
      price: "$1299",
      discountedPrice: "$999",
      status: "IN STOCK",
      image: "https://i.pinimg.com/474x/e2/42/be/e242be10b729b9f3c39c4d57ca5068b4.jpg", 
    },
    {
      id: 2,
      name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear",
      price: "$250.00",
      discountedPrice: "$220.00",
      status: "OUT OF STOCK",
      image: "https://i.pinimg.com/474x/dd/64/c8/dd64c8ca8efb6a87e969be80c217a66a.jpg", 
    },
  ];

  return (
    <>
      
      <div className={styles.wishlistContainer}>
        <h2 className={styles.title}>Wishlist</h2>
        <table className={styles.wishlistTable}>
          <thead>
            <tr>
              <th>PRODUCTS</th>
              <th>PRICE</th>
              <th>STOCK STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.productDetails}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.productImage}
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.originalPrice}>{item.price}</span>
                  <span className={styles.discountedPrice}>
                    {item.discountedPrice}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      item.status === "IN STOCK"
                        ? styles.inStock
                        : styles.outOfStock
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className={styles.buttonContainer}>
                    <button
                      className={
                        item.status === "IN STOCK"
                          ? styles.addToCartButton
                          : styles.disabledButton
                      }
                      disabled={item.status !== "IN STOCK"}
                    >
                      ADD TO CART
                    </button>
                    <button className={styles.removeButton}>&times;</button>
                  </div>
                </td>
              </tr>
            ))}
            {wishlistItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.productDetails}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.productImage}
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.originalPrice}>{item.price}</span>
                  <span className={styles.discountedPrice}>
                    {item.discountedPrice}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      item.status === "IN STOCK"
                        ? styles.inStock
                        : styles.outOfStock
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className={styles.buttonContainer}>
                    <button
                      className={
                        item.status === "IN STOCK"
                          ? styles.addToCartButton
                          : styles.disabledButton
                      }
                      disabled={item.status !== "IN STOCK"}
                    >
                      ADD TO CART
                    </button>
                    <button className={styles.removeButton}>&times;</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
};

export default Wishlist;
