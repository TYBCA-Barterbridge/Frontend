import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrow, BiArrowToRight } from "react-icons/bi";
import {
  useFetchGoodExchangeRequestsQuery,
  useRespondtogoodexchangeMutation,
} from "../../../features/good/goodApiSlice";
import {
  useFetchSkillExchangeRequestsQuery,
  useRespondtoskillexchangeMutation,
} from "../../../features/skill/skillApiSlice";

export default function ExchangeDetails() {
  const { exchangeId, type } = useParams(); // Get exchange ID and type from URL
  const [selectedExchange, setSelectedExchange] = useState(null);

  // Fetch exchange requests
  const { data: goodExchangeRequests, isLoading: isGoodExchangeRequestsLoading } =
    useFetchGoodExchangeRequestsQuery();
  const { data: skillExchangeRequests, isLoading: isSkillExchangeRequestsLoading } =
    useFetchSkillExchangeRequestsQuery();

  // Mutations for responding to requests
  const [respondToGoodExchange] = useRespondtogoodexchangeMutation();
  const [respondToSkillExchange] = useRespondtoskillexchangeMutation();

  // Fetch the selected exchange details based on type and ID
  useEffect(() => {
    if (exchangeId && type) {
      if (type === "good") {
        const exchange = goodExchangeRequests?.find(
          (req) => req.exchange_id === parseInt(exchangeId)
        );
        setSelectedExchange(exchange);
      } else if (type === "skill") {
        const exchange = skillExchangeRequests?.find(
          (req) => req.exchange_id === parseInt(exchangeId)
        );
        setSelectedExchange(exchange);
      }
    }
  }, [exchangeId, type, goodExchangeRequests, skillExchangeRequests]);

  // Handle response to exchange request (accept/reject)
  const handleRespondToRequest = async (action) => {
    try {
      if (type === "good") {
        await respondToGoodExchange({
          exchange_id: exchangeId,
          action,
        });
      } else if (type === "skill") {
        await respondToSkillExchange({
          exchange_id: exchangeId,
          action,
        });
      }
      // Refresh the page after responding
      window.location.reload();
    } catch (error) {
      console.error("Failed to respond to exchange request:", error);
    }
  };

  if (isGoodExchangeRequestsLoading || isSkillExchangeRequestsLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link to="/dashboard/exchanges" className="mr-2 -mt-4">
            <BiLeftArrow className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Exchange Details</h1>
        </div>
      </div>

      {/* Exchange Status Card */}
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          #{selectedExchange?.exchange_id || "Loading..."}
        </h2>
        <p className="text-gray-600">
          Status: {selectedExchange?.pending ? "Pending" : "Accepted"} • Type:{" "}
          {type === "good" ? "Good Exchange" : "Skill Exchange"} • Date:{" "}
          {new Date(selectedExchange?.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Exchange Details */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium mb-6">Exchange Details</h2>
        <div className="flex items-center justify-between">
          {/* Your Item */}
          <div className="text-center">
            <img
              src={
                type === "good"
                  ? selectedExchange?.goodB?.Good_imgs?.[0]?.img_url
                  : selectedExchange?.skillB?.skill_img
              }
              alt={
                type === "good"
                  ? selectedExchange?.goodB?.good_name
                  : selectedExchange?.skillB?.skill_name
              }
              className="mx-auto mb-4 w-40 h-40 rounded-lg border object-cover"
            />
            <p className="text-sm font-medium">
              {type === "good"
                ? selectedExchange?.goodB?.good_name
                : selectedExchange?.skillB?.skill_name}
            </p>
            <p className="text-sm text-gray-600">
              {type === "good"
                ? selectedExchange?.goodB?.good_amount
                : selectedExchange?.skillB?.skill_price}
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-orange-400 flex items-center justify-center">
              <BiArrowToRight className="h-10 w-10 text-orange-500" />
            </div>
          </div>

          {/* Their Item */}
          <div className="text-center">
            <img
              src={
                type === "good"
                  ? selectedExchange?.goodA?.Good_imgs?.[0]?.img_url
                  : selectedExchange?.skillA?.skill_img
              }
              alt={
                type === "good"
                  ? selectedExchange?.goodA?.good_name
                  : selectedExchange?.skillA?.skill_name
              }
              className="mx-auto mb-4 w-40 h-40 rounded-lg border object-cover"
            />
            <p className="text-sm font-medium">
              {type === "good"
                ? selectedExchange?.goodA?.good_name
                : selectedExchange?.skillA?.skill_name}
            </p>
            <p className="text-sm text-gray-600">
              {type === "good"
                ? selectedExchange?.goodA?.good_amount
                : selectedExchange?.skillA?.skill_price}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons for Pending Requests */}
      {selectedExchange?.pending && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleRespondToRequest("accept")}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Accept Exchange
          </button>
          <button
            onClick={() => handleRespondToRequest("reject")}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Decline Exchange
          </button>
        </div>
      )}

      {/* Seller Info */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-medium mb-6">Seller Info</h2>
        <div className="flex items-center mb-4">
          <img
            src={
              type === "good"
                ? selectedExchange?.goodA?.GoodListedByGeneralUsers?.[0]?.GeneralUser?.User
                    ?.profile_img
                : selectedExchange?.skillA?.SkillListedByGeneralUsers?.[0]?.GeneralUser?.User
                    ?.profile_img
            }
            alt="Seller Avatar"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <p className="font-medium">
              {type === "good"
                ? selectedExchange?.goodA?.GoodListedByGeneralUsers?.[0]?.GeneralUser?.User
                    ?.fname
                : selectedExchange?.skillA?.SkillListedByGeneralUsers?.[0]?.GeneralUser?.User
                    ?.fname}
            </p>
            <p className="text-sm text-gray-600">
              {type === "good"
                ? selectedExchange?.goodA?.GoodListedByGeneralUsers?.[0]?.GeneralUser?.User
                    ?.email
                : selectedExchange?.skillA?.SkillListedByGeneralUsers?.[0]?.GeneralUser?.User
                    ?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}