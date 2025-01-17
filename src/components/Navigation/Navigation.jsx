import styles from "./Navigation.module.css";
import React from "react";

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
    {/* Logo */}
     <a href="./Home" className={styles.logo}>BarterBridge</a>
      
    {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search any Product or Skills"
          className={styles.searchBar}
        />
        <button className={styles.searchButton}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
            alt="Search"
            className={styles.searchIcon}
          />
        </button>
      </div>

    {/* Navigation Icons */}
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <a href="./ShoppingCart" className={styles.icontext}>
          <img
            src="https://img.icons8.com/?size=100&id=ZyDjBTUuqB78&format=png&color=FFFFFF"
            alt="Cart"
            className={styles.navIcon}
          />
          </a>
          <span className={styles.iconText}>Cart</span>
        </li>
        <li className={styles.navItem}>
        <a href="./Wishlist">
          <img
            src="https://img.icons8.com/?size=100&id=37975&format=png&color=FFFFFF"
            alt="Like"
            className={styles.navIcon}
          />
           </a>
          <span className={styles.iconText}>Wishlist</span>
        </li>
        <li className={styles.navItem}>
          <a href="./Profile">
          <img
            src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF"
            alt="Profile"
            className={styles.navIcon}
            />
            </a>
         
          <span className={styles.iconText}>Profile</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
