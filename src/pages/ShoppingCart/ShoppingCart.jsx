import React, { useState } from "react";

const ShoppingCart = () => {
  const [quantities, setQuantities] = useState({ product1: 1, product2: 1 });

  const handleIncrement = (product) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: prev[product] + 1,
    }));
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#119AC0] h-10 -mt-10"></div>

      <div className="flex justify-center bg-gray-100 py-10">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-6xl p-6 gap-6">
          {/* Product Section */}
          <div className="flex-1 border-r md:pr-6">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300 text-gray-600">
                  <th className="p-3 text-left">PRODUCT</th>
                  <th className="p-3 text-left">PRICE</th>
                  <th className="p-3 text-left">QUANTITY</th>
                  <th className="p-3 text-left">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {/* Product 1 */}
                <tr className="border-b border-gray-200">
                  <td className="p-3 flex items-center gap-4">
                    <img
                      src="https://clicon-html.netlify.app/image/product/mac.png"
                      alt="Product 1"
                      className="w-16 h-14 object-cover border rounded"
                    />
                    <span>PlayStation 5 Gaming Console</span>
                  </td>
                  <td className="p-3 text-gray-700">
                    <span className="text-gray-500 line-through">$99</span> $70
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300">-</button>
                      <input
                        className="w-10 text-center border rounded"
                        type="number"
                        value={quantities.product1}
                        readOnly
                      />
                      <button
                        onClick={() => handleIncrement("product1")}
                        className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">${70 * quantities.product1}</td>
                </tr>
                {/* Product 2 */}
                <tr className="border-b border-gray-200">
                  <td className="p-3 flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/70"
                      alt="Product 2"
                      className="w-16 h-14 object-cover border rounded"
                    />
                    <span>X Box 360 Gaming Console</span>
                  </td>
                  <td className="p-3 text-gray-700">$250</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300">-</button>
                      <input
                        className="w-10 text-center border rounded"
                        type="number"
                        value={quantities.product2}
                        readOnly
                      />
                      <button
                        onClick={() => handleIncrement("product2")}
                        className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">${250 * quantities.product2}</td>
                </tr>
              </tbody>
            </table>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button className="px-5 py-2 border border-[#18abd7] text-[#18abd7] rounded hover:bg-blue-50">
                RETURN TO SHOP
              </button>
              <button className="px-5 py-2 bg-[#18abd7] text-white rounded hover:bg-[#117799]">
                UPDATE CART
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <p className="flex justify-between border-b pb-2">
                <span>Subtotal:</span> <span>$320</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span>Shipping:</span> <span>Free</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span>Discount:</span> <span>- $24</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span>Tax:</span> <span>$61.99</span>
              </p>
              <p className="flex justify-between text-lg font-bold mt-2">
                <span>Total:</span> <span>$357.99 USD</span>
              </p>
              <button className="w-full mt-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                PROCEED TO CHECKOUT
              </button>
            </div>

            {/* Coupon Section */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Coupon Code</h2>
              <input
                type="text"
                placeholder="Enter coupon code"
                className="w-full p-2 border rounded mb-3"
              />
              <button className="w-full py-2 bg-[#18abd7] text-white rounded hover:bg-[#117799]">
                APPLY COUPON
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
