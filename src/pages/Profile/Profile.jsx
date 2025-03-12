"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"

// Sidebar Component
const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { name: "Your Listings", path: "/YourListings" },
    { name: "Cards & Address", path: "" },
    { name: "Setting", path: "/Profile" },
    { name: "Logout", path: null },
  ]

  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const popupRef = useRef(null)

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev)
  }

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsPopupVisible(false)
    }
  }

  const navigate = useNavigate()

  const [sendLogout, { isLoading }] = useSendLogoutMutation()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await sendLogout().unwrap()
      navigate("/")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener("mousedown", handleOutsideClick)
    } else {
      document.removeEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isPopupVisible])

  return (
    <div className="w-[250px] bg-white border border-gray-200 rounded-lg shadow-md p-5">
      <h3 className="text-xl font-bold mb-5 text-gray-800 uppercase tracking-wider">My Account</h3>

      <ul className="list-none p-0 m-0">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`py-3 px-4 text-sm cursor-pointer rounded-lg transition-all duration-300 ${
              activeMenu === item.name ? "bg-[#18abd7] text-white" : "text-gray-600 hover:bg-[#21b3e8] hover:text-white"
            }`}
            onClick={() => {
              if (item.name === "Logout") {
                togglePopup()
              } else {
                onMenuChange(item.name)
              }
            }}
          >
            {item.path ? (
              <Link to={item.path} className="no-underline text-inherit">
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </li>
        ))}
      </ul>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-5 w-[300px] rounded-lg shadow-lg text-center z-[1001]" ref={popupRef}>
            <h2 className="m-0 mb-2.5">Are you sure?</h2>
            <p className="m-0 mb-5">You will be logged out from your account.</p>
            <div className="flex justify-around">
              <button
                className="px-5 py-2.5 bg-red-500 text-white border-none rounded cursor-pointer transition-colors hover:bg-red-600"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="px-5 py-2.5 bg-[#18abd7] text-white border-none rounded cursor-pointer transition-colors hover:bg-[#138cad]"
                onClick={togglePopup}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Input Field Component
const InputField = ({ label, type, name, value, placeholder, onChange }) => (
  <div className="flex flex-col gap-2 mb-5">
    <label htmlFor={name} className="text-sm text-gray-800">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
    />
  </div>
)

// Select Field Component
const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="flex flex-col gap-2 mb-5">
    <label htmlFor={name} className="text-sm text-gray-800">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

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
  })

  const [activeMenu, setActiveMenu] = useState("Setting")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <>
      <div className="mt-[-40px] bg-[#0f9bb7] h-[40px]"></div>
      <div className="flex gap-5 p-5 bg-[#f5f7fa] min-h-screen font-sans">
        {/* Sidebar Menu */}
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        {/* Profile Settings Section */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-7">
          <div className="mb-7">
            <h2 className="text-2xl text-gray-800 font-bold">Account Setting</h2>
          </div>

          {/* Profile Picture */}
          <div className="flex items-center gap-4 mb-7">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-3 border-gray-200">
              <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="px-4 py-2.5 text-sm font-bold bg-[#18abd7] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#21b3e8]">
              Upload New Photo
            </button>
          </div>

          {/* Form Section */}
          <form className="flex flex-wrap gap-5" onSubmit={handleSubmit}>
            {/* Left Column */}
            <div className="flex-1 min-w-[280px]">
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
            <div className="flex-1 min-w-[280px]">
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
                name="address"
                value={formData.address}
                placeholder="Panaji Goa"
                onChange={handleChange}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-5 w-full"></div>
          </form>
          <button
            type="submit"
            className="px-4 py-2 text-[15px] font-semibold bg-[#18abd7] text-white border-none rounded-lg cursor-pointer transition-all duration-300 min-w-[100px] text-center hover:bg-[#21b3e8]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile

