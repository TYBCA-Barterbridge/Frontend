import { useState, useRef, useEffect } from "react";
import {
  useGetUserByIdQuery,
  useEditUserMutation,
} from "../../features/user/userApiSlice";
import useAuth from "../../hooks/useAuth";

// Profile Component
const Profile = () => {
  const { user_id } = useAuth();
  const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(user_id);
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

  const [validationErrors, setValidationErrors] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // Populate form data when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.user.User.fname || "",
        lname: user.user.User.lname || "",
        email: user.user.User.email || "",
        bio: user.user.User.bio || "",
        phone: user.user.phone || "",
        address: user.user.address || "",
        zipcode: user.user.zipcode || "",
        state: user.user.state || "",
      });
    }
  }, [user]);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.fname.trim()) errors.fname = "First name is required.";
    if (!formData.lname.trim()) errors.lname = "Last name is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      errors.phone = "Valid phone number is required.";
    if (!formData.zipcode.trim() || !/^\d{5,6}$/.test(formData.zipcode))
      errors.zipcode = "Valid zip code is required.";
    if (!formData.state.trim()) errors.state = "State is required.";
    if (!formData.address.trim()) errors.address = "Address is required.";
    return errors;
  };

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

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

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

  // Handle real-time validation on field change
  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setValidationErrors({ ...validationErrors, [field]: "" });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data.</div>;

  return (
    <>
      <div className="flex gap-5 p-5 bg-[#f5f7fa] min-h-screen font-sans">
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-7">
          <h2 className="text-2xl text-gray-800 font-bold mb-7">
            Account Setting
          </h2>

          {/* Profile Picture */}
          <div className="flex items-center gap-4 mb-15">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-3 border-gray-200 relative shadow-xl">
              <img
                src={
                  profilePic
                  ? URL.createObjectURL(profilePic) 
                  : user.user.User.profilepic
                  ? user.user.User.profilepic.startsWith("/uploads")
                    ? user.user.User.profilepic 
                    : `/uploads/${user.user.User.profilepic}` 
                  : "/profile.webp"
                }
                alt="Profile"
                className="w-full h-full object-cover"
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
              className="px-4 py-2.5 text-sm font-bold bg-[#18abd7] text-white rounded-lg hover:bg-[#1B6392]"
              onClick={() => fileInputRef.current.click()}
            >
              Upload New Photo
            </button>
          </div>

          {/* Form Section */}
          <form className="flex flex-wrap gap-5">
            {/* Left Column */}
            <div className="flex-1 min-w-[280px]">
              {["fname", "lname", "bio"].map((field) => (
                <div key={field} className="flex flex-col gap-2 mb-5">
                  <label htmlFor={field} className="text-sm text-gray-800 capitalize">
                    {field.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    placeholder={field.replace(/_/g, " ")}
                    value={formData[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="p-2.5 text-sm text-gray-600 border rounded-lg bg-gray-50"
                  />
                  {validationErrors[field] && (
                    <span className="text-xs text-red-500">{validationErrors[field]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex-1 min-w-[280px]">
              {["phone", "state", "zipcode", "address"].map((field) => (
                <div key={field} className="flex flex-col gap-2 mb-5">
                  <label htmlFor={field} className="text-sm text-gray-800 capitalize">
                    {field.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    placeholder={field.replace(/_/g, " ")}
                    value={formData[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="p-2.5 text-sm text-gray-600 border rounded-lg bg-gray-50"
                  />
                  {validationErrors[field] && (
                    <span className="text-xs text-red-500">{validationErrors[field]}</span>
                  )}
                </div>
              ))}
              <button
                className="p-3 mt-15 bg-[#18abd7] text-white rounded-2xl hover:scale-110"
                onClick={handleConfirm}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;