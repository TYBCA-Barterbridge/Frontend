import React from "react";

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
      price: "₹1299",
      discountedPrice: "₹999",
      status: "IN STOCK",
      image: "https://i.pinimg.com/474x/e2/42/be/e242be10b729b9f3c39c4d57ca5068b4.jpg", 
    },
    {
      id: 2,
      name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear",
      price: "₹250.00",
      discountedPrice: "₹220.00",
      status: "OUT OF STOCK",
      image: "https://i.pinimg.com/474x/dd/64/c8/dd64c8ca8efb6a87e969be80c217a66a.jpg", 
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#119AC0] h-10 -mt-10"></div>

      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 mb-20">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">Wishlist</h2>

        {/* Wishlist Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 text-left">
              <th className="p-3">PRODUCTS</th>
              <th className="p-3">PRICE</th>
              <th className="p-3">STOCK STATUS</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="p-3 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
                  <span className="text-sm text-gray-800">{item.name}</span>
                </td>
                <td className="p-3">
                  <span className="text-gray-500 line-through mr-2">{item.price}</span>
                  <span className="font-bold text-gray-900">{item.discountedPrice}</span>
                </td>
                <td className="p-3">
                  <span className={`font-bold ₹{item.status === "IN STOCK" ? "text-green-600" : "text-red-500"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    className={`px-4 py-2 text-sm rounded ${
                      item.status === "IN STOCK"
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={item.status !== "IN STOCK"}
                  >
                    ADD TO CART
                  </button>
                  <button className="text-xl text-gray-500 hover:text-red-500">&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Wishlist;
