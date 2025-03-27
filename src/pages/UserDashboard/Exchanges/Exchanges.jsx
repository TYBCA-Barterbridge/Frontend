import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { useFetchGoodExchangeRequestsQuery } from '../../../features/good/goodApiSlice';
import { useFetchSkillExchangeRequestsQuery } from '../../../features/skill/skillApiSlice';
import { useGetExchangeHistoryQuery } from '../../../features/good/goodApiSlice';
import { FaExchangeAlt } from 'react-icons/fa';
FaExchangeAlt

export default function Exchanges() {
  const { data: exchangeHistory, isLoading: isExchangeHistoryLoading } = useGetExchangeHistoryQuery();
  console.log("ExchangeHistory:", exchangeHistory);

  if (isExchangeHistoryLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  console.log(Array.isArray(exchangeHistory))

  // Ensure exchangeHistory is an array before filtering
  const pendingExchanges = Array.isArray(exchangeHistory.exchanges)
    ? exchangeHistory.exchanges.filter(exchange => exchange.pending === true)
    : [];
  const approvedExchanges = Array.isArray(exchangeHistory.exchanges)
    ? exchangeHistory.exchanges.filter(exchange => exchange.pending === false)
    : [];

  console.log("Pending Exchanges:", pendingExchanges);
  console.log("Approved Exchanges:", approvedExchanges);

  const renderExchangeCard = (exchange) => {
    const isGood = exchange.type === 'good';
    const itemA = isGood ? exchange.goodA : exchange.skillA;
    const itemB = isGood ? exchange.goodB : exchange.skillB;
    const userA = isGood
      ? exchange.goodA?.GoodListedByGeneralUsers?.[0]?.GeneralUser?.User
      : exchange.skillA?.SkillListedByGeneralUsers?.[0]?.GeneralUser?.User;
      console.log(userA)

    return (
      <div key={exchange.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={exchange.profile}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{exchange.seller}</p>
              <p className="text-sm text-gray-600">{exchange.email}</p>
            </div>
          </div>
          <Link
            to={`/dashboard/exchanges/${exchange.id}/${exchange.type}`}
            className="text-orange-500 flex items-center hover:text-orange-600"
          >
            View Details <BiArrowToRight className="ml-1" />
          </Link>
        </div>

        <div className="flex items-center justify-between">
          {/* Your Item */}
          <div className="text-center">
            <img
              src={exchange.itemB.images[0]}
              className="mx-auto mb-2 w-32 h-32 rounded-lg mt-2 object-cover"
            />
            <p className="text-sm font-medium">
              {exchange.itemB.name}
            </p>
            <p className="text-sm text-gray-600">
              {exchange.itemB.amount}
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-orange-400 flex items-center justify-center">
              <FaExchangeAlt className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          {/* Their Item */}
          <div className="text-center">
            <img
              src={exchange.itemA.images[0]}
              className="mx-auto mb-2 w-32 h-32 rounded-lg mt-2 object-cover"
            />
            <p className="text-sm font-medium">
              {exchange.itemA.name}
            </p>
            <p className="text-sm text-gray-600">
              {exchange.itemA.amount}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {new Date(exchange.date).toLocaleDateString()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                exchange.pending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}
            >
              {exchange.pending ? 'Pending' : 'Approved'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Exchanges</h1>

      {/* Pending Exchanges Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Exchanges</h2>
        {pendingExchanges.length > 0 ? (
          pendingExchanges.map(exchange => renderExchangeCard(exchange))
        ) : (
          <div className="text-center py-8 text-gray-500">No pending exchanges</div>
        )}
      </div>

      {/* Approved Exchanges Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Approved Exchanges</h2>
        {approvedExchanges.length > 0 ? (
          approvedExchanges.map(exchange => renderExchangeCard(exchange))
        ) : (
          <div className="text-center py-8 text-gray-500">No approved exchanges</div>
        )}
      </div>
    </div>
  );
}