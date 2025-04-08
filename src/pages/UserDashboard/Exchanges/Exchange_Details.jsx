import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaExchangeAlt , FaUser} from "react-icons/fa";
import {
  useGetGoodExchangeHistoryQuery,
  useRespondtogoodexchangeMutation,
  useGoodExchangereviewMutation,
} from "../../../features/good/goodApiSlice";
import {
  useGetExchangeHistoryQuery,
  useRespondtoskillexchangeMutation,
  useSkillExchangereviewMutation,
} from "../../../features/skill/skillApiSlice";
import useAuth from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ExchangeDetails() {
  const navigate = useNavigate();
  const { id: exchangeId, type } = useParams();
  const [selectedExchange, setSelectedExchange] = useState(null);
  const { user_id } = useAuth();
  const [goodExchangeReview] = useGoodExchangereviewMutation();
  const [skillExchangeReview] = useSkillExchangereviewMutation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isUser, setIsUser] = useState(false);

  const { data: goodExchangeRequests, isLoading: isGoodLoading, refetch: refetchgoods } = useGetGoodExchangeHistoryQuery();
  const { data: skillExchangeRequests, isLoading: isSkillLoading,refetch: refetchskills } = useGetExchangeHistoryQuery();

  const [respondToGoodExchange] = useRespondtogoodexchangeMutation();
  const [respondToSkillExchange] = useRespondtoskillexchangeMutation();

  useEffect(() => {
    if (exchangeId && type) {
      const findExchange = (exchanges) => exchanges?.find((req) => req.id === parseInt(exchangeId));
      if (type === "good" && goodExchangeRequests) {
        const exchange = findExchange(goodExchangeRequests.exchanges);
        setIsUser(exchange?.UserA?.user_id === user_id);
        setSelectedExchange(exchange);
      } else if (type === "skill" && skillExchangeRequests) {
        const exchange = findExchange(skillExchangeRequests.exchanges);
        setIsUser(exchange?.UserA?.user_id === user_id);
        setSelectedExchange(exchange);
      }
    }
  }, [exchangeId, type, goodExchangeRequests, skillExchangeRequests, user_id]);

  const handleRespondToRequest = async (action) => {
    try {
      if (type === "good") {
        await respondToGoodExchange({ exchange_id: exchangeId, action }).unwrap();
      } else if (type === "skill") {
        await respondToSkillExchange({ exchange_id: exchangeId, action }).unwrap();
      }
      navigate("/dashboard/exchanges");
    } catch (error) {
      console.error("Failed to respond to exchange request:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const data = {
      exchange_id: selectedExchange.id,
      review,
      rating,
    };
    try {
      if (type === "good"){
        await goodExchangeReview(data).unwrap();
        refetchgoods()
      } 
      else if (type === "skill"){
        await skillExchangeReview(data).unwrap();
        refetchskills()
      }
      alert("Review submitted successfully!");
      setIsReviewModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isGoodLoading || isSkillLoading || !selectedExchange) {
    return (
      <motion.div className="flex justify-center items-center h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Loading...
      </motion.div>
    );
  }

  const item = isUser ? selectedExchange.itemA : selectedExchange.itemB;
  const otherItem = !isUser ? selectedExchange.itemA : selectedExchange.itemB;
  const otherUser = !isUser ? selectedExchange.UserA : selectedExchange.UserB;
  const reviewObj = isUser ? selectedExchange.itemB : selectedExchange.itemA;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-6 py-6 space-y-6">
      {isReviewModalOpen && (
        <div className="fixed -inset-10 flex items-center justify-center bg-black/50 backdrop-blur-lg p-4 z-40">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Review</h2>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            {reviewObj.review ? (
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p><strong>Review:</strong> {reviewObj.review}</p>
                <p><strong>Rating:</strong> {reviewObj.rating}</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Review</label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows={4}
                    placeholder="Write something about your experience..."
                  ></textarea>
                </div>
                <div className="flex items-center space-x-3">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
                  <button type="button" onClick={() => setIsReviewModalOpen(false)} className="text-sm text-gray-600 hover:underline">Cancel</button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      <motion.div className="bg-amber-100/60 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-1">#{selectedExchange.id}</h2>
        <p>Status: {selectedExchange.pending ? "Pending" : "Accepted"} • Type: {type} • Date: {new Date(selectedExchange.date).toLocaleString()}</p>
      </motion.div>

      <motion.div className="rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Exchange Details</h2>
          <button onClick={() => setIsReviewModalOpen(true)} className="text-gray-500 hover:text-gray-700">
            <BsThreeDotsVertical className="h-6 w-6" />
          </button>
        </div>
        <div className="flex pt-4 items-center justify-between">
            <motion.div key={item.id} className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <img src={item.images[0]} alt={item.name} className="mx-auto mb-4 w-40 h-40 rounded-lg border object-cover" />
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-lg text-gray-600">₹ {item.amount}</p>
            </motion.div>
          <motion.div className="w-20 h-20 rounded-full border-2 flex items-center justify-center text-orange-500"
          whileHover={{ rotateY: 180 }}
          >
            <FaExchangeAlt className="h-10 w-10" />
          </motion.div>
          <motion.div key={otherItem.id} className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <img src={otherItem.images[0]} alt={otherItem.name} className="mx-auto mb-4 w-40 h-40 rounded-lg border object-cover" />
              <p className="text-lg font-medium">{otherItem.name}</p>
              <p className="text-lg text-gray-600">₹ {otherItem.amount}</p>
            </motion.div>
        </div>
      </motion.div>

      {selectedExchange.pending && selectedExchange.UserA.user_id !== user_id && (
        <motion.div className="flex justify-center gap-4">
          <button onClick={() => handleRespondToRequest("accept")} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">Accept</button>
          <button onClick={() => handleRespondToRequest("reject")} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">Reject</button>
        </motion.div>
      )}

      <motion.div className="shadow-md rounded-lg p-6">
        <h2 className="text-xl font-medium mb-4">User Info</h2>
        <div className="flex items-center">
          {otherUser.profile ? (
            <motion.img
            src={otherUser.profile}
            alt="User Avatar"
            className="w-15 h-15 rounded-full mr-3"
            onClick={() => navigate(`/users/${otherUser.user_id}`)}
            whileHover={{ scale: 1.05 }}
          />
          ):(
            <motion.div className="w-15 h-15 rounded-full bg-gray-200 relative mr-3">
              <FaUser 
              className="mt-2 justify-self-center h-10 w-10 text-blue-600"
              onClick={() => navigate(`/users/${otherUser.user_id}`)}
              />
            </motion.div>
          )}
          
          <div>
            <p className="font-medium">{otherUser.username}</p>
            <p className="text-sm text-gray-600">{otherUser.email}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}