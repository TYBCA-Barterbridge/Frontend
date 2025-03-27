import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  BsArrowLeft,
  BsCamera,
  BsPerson,
  BsEnvelope,
  BsChatSquareText,
  BsBoxArrowRight,
} from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdateBioMutation,
  useUpdateUsernameMutation,
} from "../../features/user/userApiSlice";
import useAuth from "../../hooks/useAuth";


const Profile = () => {
  const {user_id} = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user, refetch } = useGetUserByIdQuery(user_id);
  const [updateProfile] = useUpdateProfileMutation();
  const [updateBio] = useUpdateBioMutation();
  const [updateUsername] = useUpdateUsernameMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [localUsername, setLocalUsername] = useState("");
  const [localBio, setLocalBio] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  

  console.log(user)

  useEffect(() => {
    if (user) {
      setProfileImage(user.user.User.profilepic);
      setLocalUsername(user.user.User.username || "");
      setLocalBio(user.user.User.bio || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profile", selectedFile);
        const result = await updateProfile(formData).unwrap();
        setProfileImage(result.profile);
        refetch();
      }

      if (localUsername !== user?.username) {
        const result = await updateUsername({ username: localUsername }).unwrap();
        if (result.success) {
          toast.success("Username updated successfully");
          refetch();
        }
      }

      if (localBio !== user?.bio) {
        const result = await updateBio({ bio: localBio }).unwrap();
        if (result.success) {
          toast.success("Bio updated successfully");
          refetch();
        }
      }

      setIsEditing(false);
      toast.success("Profile updated successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-500/70">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate("/chat")}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <BsArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="relative h-48 bg-gradient-to-r from-blue-900/70 to-indigo-900/70">
            <div className="absolute -bottom-26 left-8">
              <div className="relative">
                <div className="w-56 h-56 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Selected Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : profileImage ? (
                    <img
                      src={`${profileImage}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BsPerson className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute -bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <BsCamera className="w-5 h-5 text-gray-600" />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-40 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    disabled={!isEditing}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.user?.User?.email}
                    disabled
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={localBio}
                  onChange={(e) => setLocalBio(e.target.value)}
                  disabled={!isEditing}
                  rows="4"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <div className="flex gap-4">
                  {isEditing && (
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;