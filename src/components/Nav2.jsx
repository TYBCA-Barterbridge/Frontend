import React from "react";
import styles from "./Nav2.module.css";

const Nav2 = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdownButton}>All Category ↓</div>
            <div className={styles.dropdownContent}>
              <div className={styles.option}>Electronics</div>
              <div className={styles.option}>Clothing</div>
              <div className={styles.option}>Books</div>
              <div className={styles.option}>Home & Garden</div>
              <div className={styles.option}>Sports & Outdoors</div>
              <div className={styles.option}>Other</div>
            </div>
          </div>

          <button className={styles.button}>Exchange</button>
          <button className={styles.button}>Workshops</button>
          <a href="./CustomerCare" className={styles.button}>
            Customer Care
            <img
              src="https://img.icons8.com/?size=100&id=51413&format=png&color=000000"
              alt=""
              className={styles.icon1}
            />
          </a>
        </div>

        <div className={styles.right}>
          <p>Follow us :</p>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              className={styles.icon}
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              className={styles.icon}
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              className={styles.icon}
            />
          </a>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropdownButton}>English ↓</div>
            <div className={styles.dropdownContent}>
              <div className={styles.option}>Spanish</div>
              <div className={styles.option}>French</div>
              <div className={styles.option}>Chinese</div>
            </div>
          </div>
          <a href="./SignIn" className={styles.button}>
            Sign in
            <img
              src="https://img.icons8.com/?size=100&id=52625&format=png&color=000000"
              alt=""
              className={styles.icon1}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Nav2;
