import React from "react";
import styles from "./BodySection.module.css";

const BodySection = () => {
  return (
    <div>
      <div className={styles.bodySectionTop}>
        <div className={styles.banner}>
          <div>
            <h4>THE BEST PLACE TO LEARN</h4>
            <h2>Guitar</h2>
            <p>
              Learn guitar online at affordable price or by trading a skill.
            </p>
            <button className={styles.learnNowButton}>LEARN NOW</button>
            <a href="./ProductDetails">
            <img src="https://i.pinimg.com/474x/15/94/7c/15947c156a4d4f0fe510b900f53c4cbf.jpg" alt="" className={styles.bannerimage}/>

            </a>
          </div>
        </div>
        <div className={styles.sideCards}>
          <div className={styles.card}>
            <h4>EXCHANGE GOODS</h4>
            <p>Google Pixel 6 Pro</p>
            <button className={styles.exchangeButton}>EXCHANGE NOW</button>
          </div>
          <div className={styles.card}>
            <p>Join the Drum workshop</p>
            <span>₹1500</span>
            <button className={styles.joinButton}>JOIN NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodySection;
