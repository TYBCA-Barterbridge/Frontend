import React, { useState, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Profile.module.css";

// Sidebar Component
const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { name: "Your Listings", path: "/YourListings" },
    { name: "Setting", path: "/Profile" },
    { name: "Logout", path: null }, 
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
            className={activeMenu === item.name ? styles.active : ""}
            onClick={() => {
              if (item.name === "Logout") {
                togglePopup();
              } else {
                onMenuChange(item.name);
              }
            }}
          >
            {item.path ? (
              <Link to={item.path} className={styles.link}>
                {item.name}
              </Link>
            ) : (
              item.name
            )}
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
   <>
    <div className={styles.top}>
           .
         </div>
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
              src="data:image/jpeg;base64,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"
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
    </>
  );
};

export default Profile;
