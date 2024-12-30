import React, { useState } from "react";
import styles from "./Profile.module.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Sidebar Component
const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    "Dashboard",
    "Order History",
    "Track Order",
    "Shopping Cart",
    "Wishlist",
    "Compare",
    "Cards & Address",
    "Browsing History",
    "Setting",
    "Log-out",
  ];

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>My Account</h3>
      <ul className={styles.sidebarMenu}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={activeMenu === item ? styles.active : ""}
            onClick={() => onMenuChange(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, type, name, value, placeholder, onChange }) => (
  <div className={styles.row}>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

// Select Field Component
const SelectField = ({ label, name, value, options, onChange }) => (
  <div className={styles.row}>
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} value={value} onChange={onChange} required>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Profile = () => {
  const [formData, setFormData] = useState({
    displayName: "Gaurav",
    fullName: "Gaurav sahani",
    email: "gauravsahani010@gmail.com",
    phoneNumber: "+91 8605219388",
    country: "India",
    state: "Goa",
    zipCode: "403110",
    address: "Don Bosco panaji Goa",
  });

  const [activeMenu, setActiveMenu] = useState("Setting");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        {/* Sidebar Menu */}
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        {/* Profile Settings Section */}
        <div className={styles.profileSettings}>
          <div className={styles.header}>
            <h2>Account Setting</h2>
          </div>

          {/* Profile Picture */}
          <div className={styles.profilePictureSection}>
            <div className={styles.profilePicture}>
              <img
                src="https://clicon-html.netlify.app/image/avatar.png"
                alt="Profile"
              />
            </div>
            <button className={styles.uploadButton}>Upload New Photo</button>
          </div>

          {/* Form Section */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Left Column */}
            <div className={styles.formColumn}>
              <InputField
                label="Display Name"
                type="text"
                name="displayName"
                value={formData.displayName}
                placeholder="Kevin"
                onChange={handleChange}
              />
              <InputField
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Kevin Gilbert"
                onChange={handleChange}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="kevin.gilbert@gmail.com"
                onChange={handleChange}
              />
               <InputField
                label="Phone Number"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="+1-202-555-0118"
                onChange={handleChange}
              />
            </div>

            {/* Right Column */}
            <div className={styles.formColumn}>
             
              <SelectField
                label="Country/Region"
                name="country"
                value={formData.country}
                options={["India", "USA", "Bangladesh"]}
                onChange={handleChange}
              />
              <InputField
                label="State"
                type="text"
                name="state"
                value={formData.state}
                placeholder="Uttara"
                onChange={handleChange}
              />
              <InputField
                label="Zip Code"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                placeholder="1207"
                onChange={handleChange}
              />
              <InputField
                label="Address"
                type="text"
                name="Address"
                value={formData.address}
                placeholder="Panaji goa "
                onChange={handleChange}
              />
            </div>

            {/* Save Button */}
          </form>
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
