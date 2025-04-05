import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaRupeeSign,
  FaTimes,
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { useBuygoodMutation } from "../../features/good/goodApiSlice";
import { useBuyskillMutation } from "../../features/skill/skillApiSlice";

const BuyPage = () => {
  const navigate = useNavigate();
  const [buyGood, { isLoading: isGoodLoading }] = useBuygoodMutation();
  const [buySkill, { isLoading: isSkillLoading }] = useBuyskillMutation();
  const selectedGood = useSelector((state) => state.good.selectedgood);
  const selectedSkill = useSelector((state) => state.skill.selectedskill);

  const [orderDetails, setOrderDetails] = useState({
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const item = selectedGood || selectedSkill;
  const itemType = selectedGood ? "good" : "skill";
  const isLoading = isGoodLoading || isSkillLoading;

  const validateForm = () => {
    const newErrors = {};
    if (itemType === "good" && !orderDetails.address.trim()) {
      newErrors.address = "Delivery address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePurchaseClick = () => {
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handlePurchase = async () => {
    try {
      setErrorMessage("");

      const purchaseData = {
        [itemType === "good" ? "good_id" : "skill_id"]: item[`${itemType}_id`],
        amount: item[`${itemType}_amount`],
        address: orderDetails.address,
      };
      const skillpurchaseData = {
        [itemType === "good" ? "good_id" : "skill_id"]: item[`${itemType}_id`],
        amount: item[`${itemType}_amount`],
      };

      let response;
      if (itemType === "good") {
        response = await buyGood(purchaseData).unwrap();
      } else {
        response = await buySkill(skillpurchaseData).unwrap();
      }

      setShowConfirmModal(false);
      navigate("/order-summary", {
        state: {
          orderId: response?.order_id || item[`${itemType}_id`],
          item: item,
          orderDetails: orderDetails,
          type: itemType,
        },
      });
    } catch (err) {
      setErrorMessage(
        err.data?.message || "Failed to complete purchase. Please try again."
      );
      setShowConfirmModal(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">
            No item selected for purchase
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Product
        </button>

        {errorMessage && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-0 bottom-0 right-0 px-4"
            >
              <FaTimes />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Details and Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center mb-6">
              <img
                src={
                  item[`${itemType === "good" ? "Good" : "Skill"}_imgs`]?.[0]
                    ?.img_url || "/placeholder.svg"
                }
                alt={item[`${itemType}_name`]}
                className="w-40 h-40 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">
              {item[`${itemType}_name`]}
            </h2>

           
            <div className="space-y-6">
            {itemType === "good" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  value={orderDetails.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            )}
              <div className="flex justify-between items-center py-4 border-t border-gray-200">
                <span className="text-lg font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-orange-500 flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {item[`${itemType}_amount`]}
                </span>
              </div>

              <button
                onClick={handlePurchaseClick}
                disabled={isLoading}
                className={`w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Purchase"}
              </button>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Order Summary
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src={
                        item[
                          `${itemType === "good" ? "Good" : "Skill"}_imgs`
                        ]?.[0]?.img_url || "/placeholder.svg"
                      }
                      alt={item[`${itemType}_name`]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {item[`${itemType}_name`]}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{item[`${itemType}_amount`]}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{item[`${itemType}_amount`]}
                    </span>
                  </div>
                  {itemType === "good" && (
                    <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-500 font-medium">Free</span>
                  </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹0</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-orange-500 flex items-center">
                        <FaRupeeSign className="mr-1" />
                        {item[`${itemType}_amount`]}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Including GST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Purchase</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to purchase {item[`${itemType}_name`]} for{" "}
              <span className="font-semibold">
                ₹{item[`${itemType}_amount`]}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className={`px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
