import React, { useRef, useState } from "react";

const UploadPage = ({ closeModal }) => {
  const modalRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md rounded-lg p-6 relative shadow-lg animate-fadeIn"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-orange-500 transition-transform transform hover:rotate-90"
          onClick={closeModal}
        >
          ✕
        </button>

        {/* Image Upload Section */}
        <div className="text-center mb-6">
          <label className="w-44 h-40 border-2 border-dashed border-orange-500 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-orange-600 transition">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-3xl text-orange-500">+</span>
            <p className="text-gray-600">Upload Images</p>
          </label>
        </div>

        {/* Image Previews */}
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-20 h-20 border rounded-lg overflow-hidden">
                <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Product Type Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800">Product Type</h3>
          <label className="flex items-center space-x-2 mt-2">
            <input type="radio" name="workshopType" defaultChecked className="form-radio text-orange-500" />
            <span className="text-gray-700">Product</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input type="radio" name="workshopType" className="form-radio text-orange-500" />
            <span className="text-gray-700">Skill</span>
          </label>
        </div>

        {/* Product Info Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Product Info</h3>
          <div className="mt-2">
            <label className="block text-gray-700">Name:</label>
            <input type="text" className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>
          <div className="mt-2">
            <label className="block text-gray-700">Description:</label>
            <textarea className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none h-24"></textarea>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700">Price:</label>
            <input type="number" className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>
        </div>

        {/* Submit Button */}
        <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg font-bold text-lg hover:bg-orange-600 transition-transform transform hover:scale-105">
          Add Product →
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
