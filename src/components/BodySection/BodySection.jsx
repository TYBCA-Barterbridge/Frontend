import React from "react";

const BodySection = () => {
  return (
    <div className="max-w-[1350px] mx-auto flex justify-between p-5 bg-gray-100 gap-8 mb-5">
      <div className="flex-2 bg-blue-50 p-5 rounded-lg flex flex-col items-start shadow-md relative">
        <h4 className="text-blue-500 text-sm">THE BEST PLACE TO LEARN</h4>
        <h2 className="text-2xl my-2">Guitar</h2>
        <p className="text-gray-600 text-base mb-4">
          Learn guitar online at affordable price or by trading a skill.
        </p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">LEARN NOW</button>
        <a href="./ProductDetails">
          <img
            src="https://i.pinimg.com/474x/15/94/7c/15947c156a4d4f0fe510b900f53c4cbf.jpg"
            alt="Guitar"
            className="absolute right-0 top-10 w-[400px] h-[220px] cursor-pointer transition-transform transform hover:scale-105"
          />
        </a>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
          <h4 className="text-lg text-gray-800 mb-2">EXCHANGE GOODS</h4>
          <p className="text-sm text-gray-700">Google Pixel 6 Pro</p>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-md mt-2 hover:bg-blue-700 transition">
            EXCHANGE NOW
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
          <p className="text-sm text-gray-700">Join the Drum workshop</p>
          <span className="text-orange-500 font-bold mb-2">₹1500</span>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition">
            JOIN NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodySection;
