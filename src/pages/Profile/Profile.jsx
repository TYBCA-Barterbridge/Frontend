import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import {
  useGetUserByIdQuery,
  useEditUserMutation,
} from "../../features/user/userApiSlice";
import { CgProfile } from "react-icons/cg";

// Sidebar Component
const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { name: "Your Listings", path: "/YourListings" },
    { name: "Cards & Address", path: "" },
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

  const navigate = useNavigate();

  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await sendLogout().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
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
    <div className="w-[250px] bg-white border border-gray-200 rounded-lg shadow-md p-5">
      <h3 className="text-xl font-bold mb-5 text-gray-800 uppercase tracking-wider">
        My Account
      </h3>

      <ul className="list-none p-0 m-0">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`py-3 px-4 text-sm cursor-pointer rounded-lg transition-all duration-300 ${
              activeMenu === item.name
                ? "bg-[#18abd7] text-white"
                : "text-gray-600 hover:bg-[#1B6392] hover:text-white"
            }`}
            onClick={() => {
              if (item.name === "Logout") {
                togglePopup();
              } else {
                onMenuChange(item.name);
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
          <div
            className="bg-white p-5 w-[300px] rounded-lg shadow-lg text-center z-[1001]"
            ref={popupRef}
          >
            <h2 className="m-0 mb-2.5">Are you sure?</h2>
            <p className="m-0 mb-5">
              You will be logged out from your account.
            </p>
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
  );
};

// Profile Component
const Profile = () => {
  const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery();
  const [editUser, { isLoading: isEditing }] = useEditUserMutation();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    bio: "",
    phone: "",
    address: "",
    zipcode: "",
    state: "",
  });

  const [profilePic, setProfilePic] = useState(null); // State for profile picture file
  const fileInputRef = useRef(null); // Ref for file input

  const [activeMenu, setActiveMenu] = useState("Setting");

  // Populate form data when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.User.fname || "",
        lname: user.User.lname || "",
        email: user.User.email || "",
        bio: user.User.bio || "",
        phone: user.phone || "",
        address: user.address || "",
        zipcode: user.zipcode || "",
        state: user.state || "",
      });
    }
  }, [user]);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  // Handle form submission
  const handleConfirm = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fname", formData.fname);
    data.append("lname", formData.lname);
    data.append("bio", formData.bio);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("zipcode", formData.zipcode);
    data.append("state", formData.state);

    // Append profile picture if selected
    if (profilePic) {
      data.append("profilepic", profilePic);
    }

    try {
      await editUser(data).unwrap();
      refetch(); // Refetch user data to ensure the UI is up-to-date
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data.</div>;

  return (
    <>
      <div className="mt-[-40px] bg-[#0f9bb7] h-[40px]"></div>
      <div className="flex gap-5 p-5 bg-[#f5f7fa] min-h-screen font-sans">
        {/* Sidebar Menu */}
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        {/* Profile Settings Section */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-7">
          <div className="mb-7">
            <h2 className="text-2xl text-gray-800 font-bold">
              Account Setting
            </h2>
          </div>

          {/* Profile Picture */}
          <div className="flex items-center gap-4 mb-15">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-3 border-gray-200 relative shadow-xl">
              <img
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic) 
                    : user.User.profilepic
                    ? user.User.profilepic.startsWith("/uploads")
                      ? user.User.profilepic 
                      : `/uploads/${user.User.profilepic}` 
                    : "/profile.webp"
                }
                alt="Profile"
                className="w-full h-full object-cover object-center" // Ensure the image fits and is centered
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
            <button
              className="px-4 py-2.5 text-sm font-bold bg-[#18abd7] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#1B6392]"
              onClick={() => fileInputRef.current.click()}
            >
              Upload New Photo
            </button>
          </div>

          {/* Form Section */}
          <form className="flex flex-wrap gap-5">
            {/* Left Column */}
            <div className="flex-1 min-w-[280px]">
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="fname" className="text-sm text-gray-800">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                  className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="lname" className="text-sm text-gray-800">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                  className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="email" className="text-sm text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  disabled
                  className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="bio" className="text-sm text-gray-800">
                  Bio
                </label>
                <input
                  type="textbox"
                  id="bio"
                  name="bio"
                  placeholder="Bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="p-3 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 min-w-[280px]">
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="phone" className="text-sm text-gray-800">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="state" className="text-sm text-gray-800">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="zipcode" className="text-sm text-gray-800">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Zip Code"
                  value={formData.zipcode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipcode: e.target.value })
                  }
                  className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="address" className="text-sm text-gray-800">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="p-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg transition-all duration-300 bg-gray-50 focus:border-[#18abd7] focus:outline-none focus:shadow-[0_0_4px_#18abd7]"
                />
              </div>
              <div>
                <button
                  className="flex mt-15 justify-self-end p-3 bg-[#18abd7] text-white rounded-2xl hover: scale-110"
                  onClick={handleConfirm}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
