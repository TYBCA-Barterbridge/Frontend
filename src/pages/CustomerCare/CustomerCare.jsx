import React from 'react';
import styles from './CustomerCare.module.css';


function CustomerCare() {
  return (
  <>
  
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Customer Care</h2>
        <p className={styles.description}>We are here to help you. Please fill out the form below and our team will get back to you as soon as possible.</p>

        <form className={styles.form}>
          <label className={styles.label}>Full Name</label>
          <input type="text" className={styles.input} placeholder="Enter your full name" required />

          <label className={styles.label}>Email</label>
          <input type="email" className={styles.input} placeholder="Enter your email" required />

          <label className={styles.label}>Message</label>
          <textarea className={styles.textarea} placeholder="Enter your message" rows="4" required></textarea>

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>

        <div className={styles.contactInfo}>
          <p className={styles.contact}>Or contact us at: <a href="barterbridge@gmail.com" className={styles.link}>barterbridge@gmail.com</a></p>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default CustomerCare;
