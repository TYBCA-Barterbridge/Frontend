import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BiLeftArrow, BiArrowToRight } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import {
  useGetGoodExchangeHistoryQuery as useGoodExchangeHistory,
  useRespondtogoodexchangeMutation,
  useGoodExchangereviewMutation,
} from "../../../features/good/goodApiSlice";
import {
  useGetExchangeHistoryQuery as useSkillExchangeHistory,
  useRespondtoskillexchangeMutation,
  useSkillExchangereviewMutation,
} from "../../../features/skill/skillApiSlice";
import useAuth from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ExchangeDetails() {
  const navigate = useNavigate();
  const { id: exchangeId, type } = useParams();
  console.log(exchangeId, type);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const { user_id } = useAuth();
  const [goodExchangeReview, { isLoading: isReviewUpdating }] =useGoodExchangereviewMutation();
  const [skillExchangeReview, { isLoading: isReviewUpdatingSkillExchange }] = useSkillExchangereviewMutation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch exchange requests
  const {
    data: goodExchangeRequests,
    isLoading: isGoodExchangeRequestsLoading,
  } = useGoodExchangeHistory();

  const {
    data: skillExchangeRequests,
    isLoading: isSkillExchangeRequestsLoading,
  } = useSkillExchangeHistory();

  console.log("skill:", skillExchangeRequests);

  console.log(goodExchangeRequests);
  // Mutations for responding to requests
  const [respondToGoodExchange] = useRespondtogoodexchangeMutation();
  const [respondToSkillExchange] = useRespondtoskillexchangeMutation();

  // Fetch the selected exchange details based on type and ID
  useEffect(() => {
    if (exchangeId && type) {
      if (type === "good") {
        const exchange = goodExchangeRequests?.exchanges?.find(
          (req) => req.id === parseInt(exchangeId)
        );
        setSelectedExchange(exchange);
      } else if (type === "skill") {
        const exchange = skillExchangeRequests?.exchanges?.find(
          (req) => req.id === parseInt(exchangeId)
        );
        setSelectedExchange(exchange);
      }
    }
  }, [exchangeId, type, goodExchangeRequests, skillExchangeRequests]);

  // Handle response to exchange request (accept/reject)
  const handleRespondToRequest = async (action) => {
    try {
      if (type === "good") {
        console.log(exchangeId);
        await respondToGoodExchange({
          exchange_id: exchangeId,
          action,
        }).unwrap();
        navigate("/dashboard/exchanges");
      } else if (type === "skill") {
        await respondToSkillExchange({
          exchange_id: exchangeId,
          action,
        }).unwrap();
        navigate("/dashboard/exchanges");
      }
      // Refresh the page after responding
      window.location.reload();
    } catch (error) {
      console.error("Failed to respond to exchange request:", error);
    }
  };

  if (isGoodExchangeRequestsLoading || isSkillExchangeRequestsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  console.log(selectedExchange);

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.1 },
  };

  const imageVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  const openReviewModal = (selectedExchange) => {
    setIsReviewModalOpen(true);
  };
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    console.log("exchangeId:", selectedExchange);
    const data = {
      exchange_id: selectedExchange.id,
      review: review,
      rating: rating,
    };
    try {
      if (type === "good") {
        await goodExchangeReview(data).unwrap();
        alert("Review submitted successfully!");
        closeReviewModal();
      } else if (type === "skill") {
        await skillExchangeReview(data).unwrap();
        alert("Review submitted successfully!");
        closeReviewModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={cardVariant}
      className="container mx-auto px-6 py-4.5"
    >
      {isReviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg p-4 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Review
              </h2>
              <button
                onClick={closeReviewModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Existing Review */}
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm">
                <strong>Review:</strong>{" "}
                {selectedExchange.review || "No review yet"}
              </p>
              <p className="text-sm">
                <strong>Rating:</strong>{" "}
                {selectedExchange.rating || "No rating yet"}
              </p>
            </div>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="integer"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          </motion.div>
        </div>
      )}
      {/* Exchange Status Card */}
      <motion.div
        className="bg-amber-100/60 rounded-lg p-4 mb-6"
        variants={cardVariant}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          #{selectedExchange?.id || "Loading..."}
        </h2>
        <p className="text-gray-600 flex justify-between">
          Status: {selectedExchange?.pending === true ? "Pending" : "Accepted "}
          • Type: {type === "good" ? "Good Exchange" : "Skill Exchange"} • Date:{" "}
          {new Date(selectedExchange?.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            time: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </motion.div>

      {/* Exchange Details */}
      <motion.div
        className="shadow-gray-500 shadow-sm rounded-lg p-6 mb-6"
        variants={cardVariant}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium mb-6">Exchange Details</h2>
          <button
            onClick={() => openReviewModal(selectedExchange)}
            className="text-gray-500 hover:text-gray-700"
          >
            <BsThreeDotsVertical className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          {/* Your Item */}
          <motion.div className="text-center" variants={imageVariant}>
            <motion.img
              src={selectedExchange?.itemA.images[0]}
              alt={selectedExchange?.itemA?.name}
              className="mx-auto mb-4 w-40 h-40 rounded-lg border object-cover"
            />
            <p className="text-lg font-medium">
              {selectedExchange?.itemA?.name}
            </p>
            <p className="text-lg text-gray-600">
              ₹ {selectedExchange?.itemA?.amount}
            </p>
          </motion.div>

          <motion.div
            className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${
              selectedExchange?.pending === false
                ? "text-orange-500"
                : "text-green-600"
            }`}
            variants={buttonVariant}
          >
            <FaExchangeAlt
              className={`h-10 w-10 ${
                selectedExchange?.pending === false
                  ? "text-orange-500"
                  : "text-green-600"
              }`}
            />
          </motion.div>

          {/* Their Item */}
          <motion.div className="text-center" variants={imageVariant}>
            <motion.img
              src={selectedExchange?.itemB.images[0]}
              alt={selectedExchange?.itemB?.name}
              className="mx-auto mb-4 w-40 h-40 rounded-lg border object-cover"
            />
            <p className="text-lg font-medium">
              {selectedExchange?.itemB?.name}
            </p>
            <p className="text-lg text-gray-600">
              ₹ {selectedExchange?.itemB?.amount}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Action Buttons for Pending Requests */}
      <AnimatePresence>
        {selectedExchange?.pending === true &&
        selectedExchange?.UserA.user_id !== user_id ? (
          <motion.div
            className="flex justify-center gap-4 mb-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardVariant}
          >
            <motion.button
              onClick={() => handleRespondToRequest("accept")}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              variants={buttonVariant}
              whileHover="hover"
            >
              Accept Exchange
            </motion.button>
            <motion.button
              onClick={() => handleRespondToRequest("reject")}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              variants={buttonVariant}
              whileHover="hover"
            >
              Decline Exchange
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center gap-4 mb-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardVariant}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Seller Info */}
      <motion.div
        className="shadow-gray-500 shadow-sm rounded-lg p-6"
        variants={cardVariant}
      >
        <h2 className="text-xl font-medium mb-6">User Info</h2>
        <div className="flex items-center mb-4">
          <motion.img
            src={selectedExchange?.UserA.profile}
            alt="Seller Avatar"
            className="w-15 h-15 rounded-full mr-3"
            onClick={() => {
              navigate(`/users/${selectedExchange?.UserA.user_id}`);
            }}
            whileHover={{ scale: 1.05 }}
            variants={imageVariant}
          />
          <div>
            <p className="font-medium">{selectedExchange?.UserA.username}</p>
            <p className="text-sm text-gray-600">
              {selectedExchange?.UserA.email}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
