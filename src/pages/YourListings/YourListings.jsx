import React, { useState } from "react";
import styles from "./YourListings.module.css";
import UploadPage from "../UploadPage/UploadPage";

const YourListings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listings = [
    { id: 1, name: "Guitar", description: "A classic guitar", image: "./images/1.jpg" },
    { id: 2, name: "Guitar", description: "Acoustic guitar", image: "./images/2.jpg" },
    { id: 3, name: "Guitar", description: "Electric guitar", image: "./images/6.jpg" },
    { id: 4, name: "Guitar", description: "Vintage guitar", image: "./images/4.jpg" },
    { id: 4, name: "Guitar", description: "Vintage guitar", image: "./images/5.jpg" },
    { id: 4, name: "Guitar", description: "Vintage guitar", image: "./images/z9002.jpg" },
    { id: 4, name: "Guitar", description: "Vintage guitar", image: "./images/z9003.jpg" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <div className={styles.top}>.</div>
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Your Listings</h1>
        <select className={styles.select}>
          <option>Products</option>
          <option>Workshop</option>
        </select>
      </div>

      {/* Listings Section */}
      <div className={styles.listingsContainer}>
        {/* Add Product/Skill Button */}
        <div className={styles.addListing} onClick={openModal}>
          <div className={styles.addIcon}>+</div>
          <p>Add Product/Skill</p>
        </div>

        {/* Render Listings */}
        {listings.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.name} className={styles.image} />
            <div className={styles.details}>
              <p className={styles.name}>{item.name}</p>
              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && <UploadPage closeModal={closeModal} />}
    </div>
    </>
  );
};

export default YourListings;
