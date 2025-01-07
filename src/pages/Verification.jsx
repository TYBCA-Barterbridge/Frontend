import React from "react";
import styles from "./ForgotPass.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Verification = () => {
  return (
    <>
      
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Enter OTP</h2>
          <p className={styles.description}>
            Enter the verification code sent to your email
          </p>

          <form className={styles.form}>
            <label className={styles.label}>Verify</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Enter 6 digit code"
              required
            />

            <button type="submit" className={styles.submitButton}>
              Verify
            </button>
          </form>

          <div className={styles.links}>
            <a href="./SignIn" className={styles.link}>
              Resend OTP
            </a>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Verification;
