import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
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
import { useGetUserByIdQuery, useSendFriendRequestMutation } from "../features/user/userApiSlice";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

export default function TradePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, type } = useParams(); // type will be 'good' or 'skill'
  const user = useSelector((state) => state.auth.user);
  const { user_id } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch the item being exchanged
  const { data: goodData, isLoading: isGoodLoading } = useGetGoodByIdQuery(id, {
    skip: type !== "good",
  });
  const { data: skillData, isLoading: isSkillLoading } = useGetSkillByIdQuery(
    id,
    { skip: type !== "skill" }
  );

  // Get the owner's details
  const ownerId =
    type === "good"
      ? goodData?.GoodListedByGeneralUsers?.[0]?.general_user_id
      : type === "skill"
      ? skillData?.SkillListedByGeneralUsers?.[0]?.general_user_id
      : null;
  const { data: ownerData } = useGetUserByIdQuery(ownerId, { skip: !ownerId });
  console.log("OWNER DATA:", ownerData);

  // Fetch user's listed items for exchange
  const { data: userGoods, isLoading: isUserGoodsLoading } = useGetGoodbyUserQuery(user_id, {
    skip: !user_id || type !== "good"
  });
  const { data: userSkills, isLoading: isUserSkillsLoading } = useGetSkillbyUserQuery(user_id, {
    skip: !user_id || type !== "skill"
  });
  console.log("USER GOODS:", userGoods);
  console.log("USER SKILLS:", userSkills);

  // Exchange mutations
  const [sendGoodExchange] = useSendgoodexchangerequestMutation();
  const [sendSkillExchange] = useSendskillexchangerequestMutation();

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
          good_id_a: id,
          good_id_b: selectedItem.good_id,
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

  if (isGoodLoading || isSkillLoading || isUserGoodsLoading || isUserSkillsLoading) {
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

  // Get user's items for the dropdown
  const userItems = type === "good" 
    ? (Array.isArray(userGoods) ? userGoods : userGoods ? [userGoods] : [])
    : (Array.isArray(userSkills) ? userSkills : userSkills ? [userSkills] : []);

  // const [sendFriendRequest] = useSendFriendRequestMutation();

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest({
        receiver_id: ownerData?.user?.User?.user_id
      }).unwrap();
      console.log("Friend request sent successfully");
    } catch (err) {
      console.error("Failed to send friend request:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
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
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium mb-6">Exchange Details</h2>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your {type === "good" ? "Good" : "Skill"} to Exchange
              </label>
              {type === "good" ? (
                // Render goods dropdown
                <select
                  value={selectedItem ? selectedItem.good_id : ""}
                  onChange={(e) => {
                    const selected = userItems.find(
                      (item) => item.good_id.toString() === e.target.value
                    );
                    setSelectedItem(selected);
                  }}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a good...</option>
                  {userItems.map((item) => (
                    <option key={item.good_id} value={item.good_id}>
                      {item.good_name} - ₹{item.good_amount}
                    </option>
                  ))}
                </select>
              ) : (
                // Render skills dropdown
                <select
                  value={selectedItem ? selectedItem.skill_id : ""}
                  onChange={(e) => {
                    const selected = userItems.find(
                      (item) => item.skill_id.toString() === e.target.value
                    );
                    setSelectedItem(selected);
                  }}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a skill...</option>
                  {userItems.map((item) => (
                    <option key={item.skill_id} value={item.skill_id}>
                      {item.skill_name} - ₹{item.skill_amount}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {selectedItem && (
              <div className="mt-4">
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
                  className="mx-auto mb-2 w-40 h-40 rounded-lg border object-cover"
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
              </div>
            )}
          </div>

          <div className="flex-shrink-0">
            <div className="w-18 h-18 rounded-full border-2 border-orange-400 flex items-center justify-center">
              <img src="/images/arrow.png" alt="arrow.png" />
            </div>
          </div>

          <div className="text-center mt-26">
            <img
              src={
                itemData?.Good_imgs?.[0]?.img_url ||
                itemData?.Skill_imgs?.[0]?.img_url ||
                "/default-image.png"
              }
              alt={itemData?.good_name || itemData?.skill_name}
              className="mx-auto mb-4 w-40 h-40 rounded-lg border"
            />
            <p className="text-sm">{ownerData?.user?.user?.User?.username}</p>
            <p className="text-sm font-medium">
              {itemData?.good_name || itemData?.skill_name}
            </p>
            <p className="text-sm text-gray-600">
              ₹{itemData?.good_amount || itemData?.skill_amount}
            </p>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="flex justify-center">
          <button
            onClick={handleSendRequest}
            disabled={isLoading || !selectedItem}
            className={`mt-4 border border-blue-400 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer ${
              isLoading || !selectedItem ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending Request..." : "Send Exchange Request"}
          </button>
        </div>
      </div>

      {/* Seller Info */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-medium mb-6">Item Owner</h2>
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img
                src={
                  ownerData?.user?.User?.profilepic || "/default-avatar.png"
                }
                alt="Owner Avatar"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">
                  {ownerData?.user?.User?.username}
                </p>
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
            <div className="flex items-center mt-4">
              <button
                onClick={handleSendFriendRequest}
                className="mt-4 border border-orange-400 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer"
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-medium mb-4">Request Sent!</h2>
            <p className="text-gray-600">
              Your exchange request has been successfully sent.
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/dashboard/exchanges");
              }}
              className="mt-4 border border-blue-400 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
