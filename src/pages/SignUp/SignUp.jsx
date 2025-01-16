import React from 'react';
import styles from './SignUp.module.css';

function SignUp() {
  return (
    <>
  
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign Up</h2>

        <form className={styles.form}>
          <label className={styles.label}>Full Name</label>
          <input type="text" className={styles.input} placeholder="Enter your full name" required />

          <label className={styles.label}>Email</label>
          <input type="email" className={styles.input} placeholder="Enter your email" required />

          <label className={styles.label}>Password</label>
          <input type="password" className={styles.input} placeholder="Enter your password" required />

          <label className={styles.label}>Confirm Password</label>
          <input type="password" className={styles.input} placeholder="Confirm your password" required />

          <button type="submit" className={styles.submitButton}>Sign Up</button>
        </form>

        <div className={styles.links}>
          <p>Already have an account? <a href="../SignIn" className={styles.link}>Sign In</a></p>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default SignUp;
