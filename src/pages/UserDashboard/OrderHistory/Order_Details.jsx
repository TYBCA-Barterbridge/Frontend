import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetGoodOrderHistoryQuery,
  useBoughtgoodreviewMutation,
} from "../../../features/good/goodApiSlice";
import {
  useGetSkillOrderHistoryQuery,
  useBoughtskillreviewMutation,
} from "../../../features/skill/skillApiSlice";
import { format } from "date-fns";

const OrderDetails = () => {
  const { id, type } = useParams();
  const { data: goodData } = useGetGoodOrderHistoryQuery();
  const { data: skillData } = useGetSkillOrderHistoryQuery();
  const [boughtgoodreview,{isLoading: isGoodReviewLoading }] =
    useBoughtgoodreviewMutation();
  const [boughtskillreview,{isLoading: isSkillReviewLoading }] =
    useBoughtskillreviewMutation();

  const orders = type === "good" ? goodData?.orders : skillData?.orders;
  const order = orders?.find((o) => o.id === parseInt(id));

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState({});

  if (!order) {
    return <p className="p-4">Order not found</p>;
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!rating || rating < 1 || rating > 5)
      newErrors.rating = "Please select a rating.";
    if (!reviewText || reviewText.length < 5)
      newErrors.review = "Review must be at least 5 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
        if (type === "good") {
            const data = {
                good_id: order.item.id,
                rating,
                review: reviewText,
            };
            boughtgoodreview(data).unwrap();
        }
        else {
            const data = {
                skill_id: order.item.id,
                rating,
                review: reviewText,
            };
            boughtskillreview(data).unwrap();
        }
      setShowReviewForm(false);
      setRating(0);
      setReviewText("");
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ server: "Failed to submit review. Please try again." });
      return;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Order Details</h2>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={order.item.images?.[0] || "/placeholder.svg"}
          alt={order.item.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-3">
          <p>
            <span className="font-semibold">Item:</span> {order.item.name}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ₹{order.item.amount}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {format(new Date(order.date), "PPP")}
          </p>
          <p>
            <span className="font-semibold">Seller:</span>{" "}
            {order.item.seller || "Unknown"}
          </p>
          {order.type === "good" && (
            <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-sm ${
                order.item.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.item.status || "Completed"}
            </span>
          </p>
          )}

          {order.review ? (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Your Review</h3>
              <div className="text-yellow-500 text-xl">
                {"★".repeat(order.rating)}
                {"☆".repeat(5 - order.rating)}
              </div>
              <p className="text-gray-700 mt-1">{order.review}</p>
            </div>
          ) : (
            <>
              {!showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
                >
                  Add Review
                </button>
              )}

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Rating
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-2xl ${
                            star <= rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {errors.rating && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Review
                    </label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      placeholder="Write something about your experience..."
                    ></textarea>
                    {errors.review && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.review}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setErrors({});
                        setRating(0);
                        setReviewText("");
                      }}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
