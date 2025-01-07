import React from "react";
import styles from "./ForgotPass.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function ForgotPass() {
  return (
    <>
      
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Forgot Password</h2>
          <p className={styles.description}>
            Enter your email address to verify.
          </p>

          <form className={styles.form}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              required
            />
            <a href="./Verification" className={styles.link}>
              <div className={styles.submitButton}>
                Send
              </div>
            </a>
          </form>

          <div className={styles.links}>
            <a href="./SignIn" className={styles.link}>
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default ForgotPass;
