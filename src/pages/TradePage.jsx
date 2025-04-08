import { useState, useEffect } from "react";
import { FaArrowLeft, FaExchangeAlt, FaSpinner, FaUser, FaUserPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  useSendgoodexchangerequestMutation,
  useGetGoodByIdQuery,
  useGetGoodbyUserQuery,
} from "../features/good/goodApiSlice";
import {
  useSendskillexchangerequestMutation,
  useGetSkillByIdQuery,
  useGetSkillbyUserQuery,
} from "../features/skill/skillApiSlice";
import {
  useGetUserByIdQuery,
  useSendFriendRequestMutation,
} from "../features/user/userApiSlice";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

export default function TradePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, type } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { user_id } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: goodData, isLoading: isGoodLoading } = useGetGoodByIdQuery(id, {
    skip: type !== "good",
  });
  const { data: skillData, isLoading: isSkillLoading } = useGetSkillByIdQuery(
    id,
    {
      skip: type !== "skill",
    }
  );

  const ownerId =
    type === "good"
      ? goodData?.GoodListedByGeneralUsers?.[0]?.general_user_id
      : type === "skill"
      ? skillData?.SkillListedByGeneralUsers?.[0]?.general_user_id
      : null;
  const { data: ownerData } = useGetUserByIdQuery(ownerId, { skip: !ownerId });

  const { data: userGoods, isLoading: isUserGoodsLoading } =
    useGetGoodbyUserQuery(user_id, {
      skip: !user_id || type !== "good",
    });
  const { data: userSkills, isLoading: isUserSkillsLoading } =
    useGetSkillbyUserQuery(user_id, {
      skip: !user_id || type !== "skill",
    });

  const [sendGoodExchange] = useSendgoodexchangerequestMutation();
  const [sendSkillExchange] = useSendskillexchangerequestMutation();
  const [sendFriendRequest, { isLoading: isSendingRequest }] =
    useSendFriendRequestMutation();
  const [requestSent, setRequestSent] = useState(false);
  const [chatError, setChatError] = useState(null);

  const handleSendRequest = async () => {
    if (!selectedItem) {
      setError("Please select an item to exchange");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (type === "good") {
        await sendGoodExchange({
          good_id_a: selectedItem.good_id,
          good_id_b: id,
        }).unwrap();
      } else if (type === "skill") {
        await sendSkillExchange({
          skill_id_a: selectedItem.skill_id,
          skill_id_b: id,
        }).unwrap();
      }

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard/exchanges");
      }, 2000);
    } catch (err) {
      setError(err.data?.message || "Failed to send exchange request");
    } finally {
      setIsLoading(false);
    }
  };

  if (
    isGoodLoading ||
    isSkillLoading ||
    isUserGoodsLoading ||
    isUserSkillsLoading
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const itemData = type === "good" ? goodData : skillData;
  if (!itemData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Item not found
      </div>
    );
  }

  const userItems =
    type === "good"
      ? Array.isArray(userGoods)
        ? userGoods
        : userGoods
        ? [userGoods]
        : []
      : Array.isArray(userSkills)
      ? userSkills
      : userSkills
      ? [userSkills]
      : [];

  const renderDropdown = () => (
    <select
      value={
        selectedItem
          ? type === "good"
            ? selectedItem.good_id
            : selectedItem.skill_id
          : ""
      }
      onChange={(e) => {
        const selected = userItems.find(
          (item) =>
            (type === "good" ? item.good_id : item.skill_id).toString() ===
            e.target.value
        );
        setSelectedItem(selected);
      }}
      className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select a {type}...</option>
      {userItems.map((item) => (
        <option
          key={type === "good" ? item.good_id : item.skill_id}
          value={type === "good" ? item.good_id : item.skill_id}
        >
          {type === "good" ? item.good_name : item.skill_name} - ₹
          {type === "good" ? item.good_amount : item.skill_amount}
        </option>
      ))}
    </select>
  );

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest({
        receiver_id: ownerData?.user?.User?.user_id,
      }).unwrap();
      setRequestSent(true);
    } catch (error) {
      console.error("Failed to send friend request:", error);
      if (error.status === 400) {
        setChatError("Already sent friend request");
      }
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-2 -mt-4">
            <FaArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-2xl cursor-pointer font-bold mb-4 text-gray-800 hover:underline">
            Trade {type === "good" ? "Good" : "Skill"}
          </h1>
        </div>
      </div>

      {/* Exchange Details */}
      <motion.div
        className="shadow-md shadow-gray-400 rounded-lg p-6 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-medium mb-6">Exchange Details</h2>

        <div>
          <div className="flex flex-col items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your {type === "good" ? "Good" : "Skill"} to Exchange
            </label>
            {renderDropdown()}
          </div>
          <div className="flex items-center justify-between">
            {selectedItem && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={
                    type === "good"
                      ? selectedItem.Good_imgs?.[0]?.img_url
                      : selectedItem.Skill_imgs?.[0]?.img_url
                  }
                  alt={
                    type === "good"
                      ? selectedItem.good_name
                      : selectedItem.skill_name
                  }
                  className=" mb-2 w-40 h-40 rounded-lg shadow-md shadow-gray-400 object-cover"
                />
                <p className="text-sm font-medium">
                  {type === "good"
                    ? selectedItem.good_name
                    : selectedItem.skill_name}
                </p>
                <p className="text-sm text-gray-600">
                  ₹
                  {type === "good"
                    ? selectedItem.good_amount
                    : selectedItem.skill_amount}
                </p>
              </motion.div>
            )}

            <motion.div className="flex md:my-0" whileHover={{ rotateY: 180 }}>
              {selectedItem && (
                <div className="w-16 h-16 rounded-full border-2 border-orange-400 flex items-center justify-center">
                  <FaExchangeAlt className="h-10 w-10 text-orange-500" />
                </div>
              )}
            </motion.div>

            <div className="mt-10">
              <img
                src={
                  itemData?.Good_imgs?.[0]?.img_url ||
                  itemData?.Skill_imgs?.[0]?.img_url ||
                  "/default-image.png"
                }
                alt={itemData?.good_name || itemData?.skill_name}
                className="mx-auto mb-4 w-40 h-40 rounded-lg shadow-md shadow-gray-400"
              />
              <p className="text-sm font-medium">
                {itemData?.good_name || itemData?.skill_name}
              </p>
              <p className="text-sm text-gray-600">
                ₹{itemData?.good_amount || itemData?.skill_amount}
              </p>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="flex justify-center">
          <button
            onClick={handleSendRequest}
            disabled={isLoading || !selectedItem}
            className={`mt-4 shadow-md border shadow-gray-400 border-blue-400 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer ${
              isLoading || !selectedItem ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending Request..." : "Send Exchange Request"}
          </button>
        </div>
      </motion.div>

      {/* Seller Info */}
      <motion.div
        className="shadow-md shadow-gray-400 rounded-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-medium mb-6">Item Owner</h2>
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              {ownerData?.user?.User?.profilepic ? (
                  <img
                  src={ownerData?.user?.User?.profilepic}
                  alt="Owner Avatar"
                  className="w-12 h-12 rounded-full mr-3"
                />
              )
            :(
              <FaUser  className="w-12 h-12 rounded-full mr-3"/>
            )}
              
              <div>
                <p className="font-medium">{ownerData?.user?.User?.username}</p>
                <p className="text-sm text-gray-600">
                  {ownerData?.user?.state || "Location not provided"}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Email:</span>{" "}
                {ownerData?.user?.User?.email}
              </p>
              <p>
                <span className="text-gray-600">Phone:</span>{" "}
                {ownerData?.user?.phone || "Not provided"}
              </p>
            </div>
            <div className="flex items-center mt-4 gap-x-10">
              <button
                onClick={handleSendFriendRequest}
                disabled={isSendingRequest || requestSent}
                className={`text-lg flex items-center px-7 py-3 rounded-lg ${
                  requestSent
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-500 text-white hover:bg-sky-600"
                }`}
              >
                {isSendingRequest ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaUserPlus className="mr-2" />
                )}
                {chatError
                  ? "Already sent friend request"
                  : requestSent
                  ? "Request Sent"
                  : "Add Friend"}
              </button>
              <button
                onClick={()=>{
                  navigate("/Chat")
                }}
                className="text-lg flex items-center px-6 py-3 rounded-lg  bg-orange-500 text-white hover:bg-sky-600"
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-medium mb-4">Request Sent!</h2>
              <p className="text-gray-600">
                Your exchange request has been successfully sent.
              </p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/dashboard/exchanges");
                }}
                className="mt-4 shadow-md shadow-gray-400 border-blue-400 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
