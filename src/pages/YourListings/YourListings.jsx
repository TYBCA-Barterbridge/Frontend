import React, { useState } from "react";
import UploadPage from "../UploadPage/UploadPage";

const YourListings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listings = [
    { id: 1, name: "Guitar", description: "A classic guitar", image: "./images/1.jpg" },
    { id: 2, name: "Guitar", description: "Acoustic guitar", image: "./images/2.jpg" },
    { id: 3, name: "Guitar", description: "Electric guitar", image: "./images/6.jpg" },
    { id: 4, name: "Guitar", description: "Vintage guitar", image: "./images/4.jpg" },
    { id: 5, name: "Guitar", description: "Vintage guitar", image: "./images/5.jpg" },
    { id: 6, name: "Guitar", description: "Vintage guitar", image: "./images/z9002.jpg" },
    { id: 7, name: "Guitar", description: "Vintage guitar", image: "./images/z9003.jpg" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0f9bb7] h-10 -mt-10"></div>

      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Your Listings</h1>
          <select className="border-2 border-gray-300 text-sm p-2">
            <option>Products</option>
            <option>Workshop</option>
          </select>
        </div>

        {/* Listings Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-gray-100 p-4">
          {/* Add Product/Skill Button */}
          <div 
            className="flex flex-col items-center justify-center w-[210px] h-[250px] border-2 border-dashed border-gray-300 rounded-lg text-[#f48024] font-bold cursor-pointer hover:bg-gray-200"
            onClick={openModal}
          >
            <div className="text-4xl mb-2">+</div>
            <p>Add Product/Skill</p>
          </div>

          {/* Render Listings */}
          {listings.map((item) => (
            <div key={item.id} className="w-[210px] h-[250px] border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white">
              <img src={item.image} alt={item.name} className="w-full h-[70%] object-cover" />
              <div className="p-2 text-center">
                <p className="font-semibold">{item.name}</p>
                <div className="text-xs text-gray-600 break-words">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <UploadPage closeModal={closeModal} />}
    </>
  );
};

export default YourListings;
