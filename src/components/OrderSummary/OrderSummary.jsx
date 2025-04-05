import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaRupeeSign, FaCheckCircle, FaMapMarkerAlt, FaEnvelope, FaShoppingBag } from 'react-icons/fa';

const OrderSummary = () => {
  const location = useLocation();
  const { orderId, item, orderDetails, type } = location.state || {};
  console.log(type, orderDetails, item);

  if (!item || !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No order details available</h2>
          <Link 
            to="/"
            className="inline-block bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="bg-green-50 rounded-lg p-6 mb-8 flex items-center justify-center">
          <FaCheckCircle className="text-green-500 text-3xl mr-3" />
          <div>
            <h2 className="text-xl font-semibold text-green-800">Order Placed Successfully!</h2>
            <p className="text-green-600 mt-1">Thank you for your purchase</p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
              <span className="text-sm text-gray-500">Order ID: {orderId}</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item[`${type === 'good' ? 'Good' : 'Skill'}_imgs`]?.[0]?.img_url || "/placeholder.svg"}
                  alt={item[`${type}_name`]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item[`${type}_name`]}</h3>
                <p className="mt-1 text-sm text-gray-500">{item[`${type}_description`]}</p>
                <div className="mt-2 flex items-center text-orange-500 font-semibold">
                  <FaRupeeSign className="mr-1" />
                  <span>{item[`${type}_amount`]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          {type === 'good' && (
            <div className="p-6 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Delivery Information</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="text-sm font-medium text-gray-900">{orderDetails.address}</p>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Price Summary */}
          <div className="p-6 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{item[`${type}_amount`]}</span>
              </div>
              {type === 'good' && (
                <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              )
              }
              <div className="pt-4 mt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-orange-500 flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {item[`${type}_amount`]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8 text-center">
          <Link 
            to="/"
            className="inline-flex items-center justify-center bg-orange-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <FaShoppingBag className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 