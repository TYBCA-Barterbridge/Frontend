import React from 'react';
import { useGetOrderHistoryQuery } from '../../../features/good/goodApiSlice';
import { useGetOrderHistoryQuery as useGetSkillOrderHistoryQuery } from '../../../features/skill/skillApiSlice';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const OrderHistory = () => {
  const { 
    data: goodOrderHistory, 
    isLoading: isGoodLoading, 
    isError: isGoodError,
    error: goodError 
  } = useGetOrderHistoryQuery();

  const { 
    data: skillOrderHistory, 
    isLoading: isSkillLoading, 
    isError: isSkillError,
    error: skillError 
  } = useGetSkillOrderHistoryQuery();

  const isLoading = isGoodLoading || isSkillLoading;
  const isError = isGoodError || isSkillError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <p className="mt-1">
            {goodError?.data?.message || skillError?.data?.message || 'Failed to load order history. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  const { monetary: goodMonetary = [], exchanges: goodExchanges = [] } = goodOrderHistory || {};
  const { monetary: skillMonetary = [], exchanges: skillExchanges = [] } = skillOrderHistory || {};

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return '/placeholder.svg';
    const imgUrl = images[0]?.img_url || images[0];
    if (!imgUrl) return '/placeholder.svg';
    return imgUrl.startsWith('http') ? imgUrl : `/${imgUrl.split('/').pop()}`;
  };

  const renderMonetaryTable = (monetary, type) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Item</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Seller</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Review</th>
          </tr>
        </thead>
        <tbody>
          {monetary.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{formatDate(order.date)}</td>
              <td className="px-4 py-2 border">
                <div className="flex items-center space-x-3">
                  <img 
                    src={getImageUrl(order.item.images)} 
                    alt={order.item.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.svg';
                    }}
                  />
                  <Link to={`/${type}/${order.item.id}`} className="text-blue-600 hover:underline">
                    {order.item.name}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-2 border">₹{order.item.amount}</td>
              <td className="px-4 py-2 border">{order.item.seller}</td>
              <td className="px-4 py-2 border">
                <span className={`px-2 py-1 rounded ${
                  order.item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.item.status}
                </span>
              </td>
              <td className="px-4 py-2 border">
                {order.review ? (
                  <div>
                    <div className="flex gap-1">{renderStars(order.rating)}</div>
                    <p className="text-sm mt-1">{order.review}</p>
                  </div>
                ) : (
                  <Link 
                    to={`/review/${type}/${order.id}`} 
                    className="text-blue-600 hover:underline"
                  >
                    Add Review
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderExchangesTable = (exchanges, type) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Your Item</th>
            <th className="px-4 py-2 border">Exchanged With</th>
            <th className="px-4 py-2 border">Other User</th>
            <th className="px-4 py-2 border">Review</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange) => (
            <tr key={exchange.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{formatDate(exchange.date)}</td>
              <td className="px-4 py-2 border">
                <div className="flex items-center space-x-3">
                  <img 
                    src={getImageUrl(exchange.itemA.images)} 
                    alt={exchange.itemA.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.svg';
                    }}
                  />
                  <Link to={`/${type}/${exchange.itemA.id}`} className="text-blue-600 hover:underline">
                    {exchange.itemA.name} (₹{exchange.itemA.amount})
                  </Link>
                </div>
              </td>
              <td className="px-4 py-2 border">
                <div className="flex items-center space-x-3">
                  <img 
                    src={getImageUrl(exchange.itemB.images)} 
                    alt={exchange.itemB.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.svg';
                    }}
                  />
                  <Link to={`/${type}/${exchange.itemB.id}`} className="text-blue-600 hover:underline">
                    {exchange.itemB.name} (₹{exchange.itemB.amount})
                  </Link>
                </div>
              </td>
              <td className="px-4 py-2 border">{exchange.buyer}</td>
              <td className="px-4 py-2 border">
                {exchange.review ? (
                  <div>
                    <div className="flex gap-1">{renderStars(exchange.rating)}</div>
                    <p className="text-sm mt-1">{exchange.review}</p>
                  </div>
                ) : (
                  <Link 
                    to={`/review/${type}/exchange/${exchange.id}`} 
                    className="text-blue-600 hover:underline"
                  >
                    Add Review
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      {/* Goods Monetary Transactions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Goods Purchases</h3>
        {goodMonetary.length === 0 ? (
          <p className="text-gray-500">No goods purchases found</p>
        ) : (
          renderMonetaryTable(goodMonetary, 'good')
        )}
      </div>

      {/* Skills Monetary Transactions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Skills Purchases</h3>
        {skillMonetary.length === 0 ? (
          <p className="text-gray-500">No skills purchases found</p>
        ) : (
          renderMonetaryTable(skillMonetary, 'skill')
        )}
      </div>

      {/* Goods Exchanges */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Goods Exchanges</h3>
        {goodExchanges.length === 0 ? (
          <p className="text-gray-500">No goods exchanges found</p>
        ) : (
          renderExchangesTable(goodExchanges, 'good')
        )}
      </div>

      {/* Skills Exchanges */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Skills Exchanges</h3>
        {skillExchanges.length === 0 ? (
          <p className="text-gray-500">No skills exchanges found</p>
        ) : (
          renderExchangesTable(skillExchanges, 'skill')
        )}
      </div>
    </div>
  );
};

export default OrderHistory;