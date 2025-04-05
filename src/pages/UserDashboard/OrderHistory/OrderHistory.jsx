import React from 'react';
import { useGetGoodOrderHistoryQuery } from '../../../features/good/goodApiSlice';
import { useGetSkillOrderHistoryQuery } from '../../../features/skill/skillApiSlice';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const OrderHistory = () => {
  const { data: goodOrderHistory, isLoading: isGoodLoading, isError: isGoodError, error: goodError } = useGetGoodOrderHistoryQuery();
  const { data: skillOrderHistory, isLoading: isSkillLoading, isError: isSkillError, error: skillError } = useGetSkillOrderHistoryQuery();

  const isLoading = isGoodLoading || isSkillLoading;
  const isError = isGoodError || isSkillError;

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Invalid Date';
    }
  };

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return '/placeholder.svg';
    const imgUrl = images[0]?.img_url || images[0];
    return imgUrl.startsWith('http') ? imgUrl : `/${imgUrl.split('/').pop()}`;
  };

  const renderOrderCard = (order, type) => (
    <div
      key={order.id}
      className="bg-white shadow-gray-300 shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 w-full sm:w-[48%] md:w-[32%] lg:w-[30%]"
    >
      <img
        src={getImageUrl(order.item.images)}
        alt={order.item.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/placeholder.svg';
        }}
      />
      <h3 className="text-lg font-semibold capitalize">{order.item.name}</h3>
      <p className="text-gray-500 text-sm">{formatDate(order.date)}</p>
      <p className="text-sm mt-1">Seller: <span className="text-gray-700 font-medium">{order.item.seller || 'Unknown'}</span></p>
      <p className="text-sm mt-1">Amount: ₹{order.item.amount}</p>
      {order.type === 'good' && (
        <p className="text-sm mt-1">
        Status: <span className="font-medium">{order.item.status || 'Ordered'}</span>
      </p>
      )
      }
      <div className="mt-3 flex justify-between items-center">
        {order.review ? (
          <div className="text-yellow-500 text-sm">
            {'★'.repeat(order.rating)}{'☆'.repeat(5 - order.rating)}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No review yet</p>
        )}
        <Link to={`${type}/${order.id}`} className="text-sm bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
          View Details
        </Link>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><FaSpinner className="animate-spin text-4xl text-orange-500" /></div>;
  }

  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <p className="mt-1">
            {goodError?.data?.message || skillError?.data?.message || 'Failed to load order history.'}
          </p>
        </div>
      </div>
    );
  }

  const goodMonetary = goodOrderHistory?.orders || [];
  const skillMonetary = skillOrderHistory?.orders || [];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">Order History</h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Goods Purchases</h3>
        {goodMonetary.length === 0 ? (
          <p className="text-gray-500">No goods purchases found</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {goodMonetary.map((order) => renderOrderCard(order, 'good'))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Skills Purchases</h3>
        {skillMonetary.length === 0 ? (
          <p className="text-gray-500">No skills purchases found</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {skillMonetary.map((order) => renderOrderCard(order, 'skill'))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderHistory;