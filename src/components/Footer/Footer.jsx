import React from "react";
import styles from "./Footer.module.css";
<script
  src="https://kit.fontawesome.com/668a90d172.js"
  crossorigin="anonymous"
></script>;

const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h1>BarteBridge</h1>
            <div className={styles.subscribe}>
              <input
                type="email"
                placeholder="Enter Your Email*"
                className={styles.input}
              />
              <button className={styles.button}>Subscribe</button>
            </div>
            <p>Get monthly updates and free resources.</p>
          </div>
          <div className={styles.section}>
            <h3>CONTACT US</h3>
            <p>Phone: +91 0000000000</p>
            <p>Email: barterbridge@gmail.com</p>
            <p>Address: Don Bosco College Panjim Goa 403001</p>
            <div className={styles.socials}>
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
            </div>
          </div>
          <div className={styles.section}>
            <h3>RECENT NEWS</h3>
            <ul className={styles.links}>
              <li>About Us</li>
              <li>Services</li>
              <li>Get In Touch</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>LINKS</h3>
            <ul className={styles.links}>
              <li></li>
              <li>Download for Mac</li>
              <li>Download for Windows</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
