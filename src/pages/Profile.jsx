// export default Profile;
import React, { useState, useRef } from "react";
import styles from "./Profile.module.css";

// Sidebar Component
const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    "Your Listings",
    "Shopping Cart",
    "Wishlist",
    "Cards & Address",
    "Setting",
    "Logout",
  ];

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsPopupVisible(false);
    }
  };

  React.useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPopupVisible]);

  return (
    
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>My Account</h3>

      <ul className={styles.sidebarMenu}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={activeMenu === item ? styles.active : ""}
            onClick={() => {
              if (item === "Logout") {
                togglePopup();
              } else {
                onMenuChange(item);
              }
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      {isPopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup} ref={popupRef}>
            <h2>Are you sure?</h2>
            <p>You will be logged out from your account.</p>
            <div className={styles.buttons}>
              <a href="./SignIn">

              <button className={styles.confirmButton}>Yes</button>
              </a>
              <button className={styles.cancelButton} onClick={togglePopup}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
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

// Profile Component
const Profile = () => {
  const [formData, setFormData] = useState({
    displayName: "Gaurav",
    fullName: "Gaurav Sahani",
    email: "gauravsahani010@gmail.com",
    phoneNumber: "+91 8605219388",
    country: "India",
    state: "Goa",
    zipCode: "403110",
    address: "Don Bosco Panaji Goa",
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
              name="address" // Corrected to lowercase
              value={formData.address}
              placeholder="Panaji Goa"
              onChange={handleChange}
            />
          </div>

          {/* Save Button */}
          <div className={styles.buttonGroup}></div>
        </form>
        <button type="submit" className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
