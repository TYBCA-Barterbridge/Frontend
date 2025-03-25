import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function TradePage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleImageDelete = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSendRequest = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Auto-close after 2 seconds
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button className="mr-2 -mt-4">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h className="text-2xl cursor-pointer font-bold mb-4 text-gray-800 hover:underline">
            Trade Product
          </h>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="mb-6 m-auto border p-4 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Upload Your Product Details</h1>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="mb-2 bg-gray-100 w-50 cursor-pointer" />
        <input 
          type="text" 
          placeholder="Enter product name" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          className="border rounded p-2 w-full mt-2"
        />
        <textarea
          placeholder="Enter product description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border rounded p-2 w-full mt-2"
        />
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Uploaded ${index}`} className="w-20 h-20 object-cover rounded" />
              <button onClick={() => handleImageDelete(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">X</button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium mb-6">Product Details</h2>
        <div className="flex items-center justify-between">
          <div className="text-center">
            {uploadedImages.length > 0 ? (
              <img
                src={uploadedImages[uploadedImages.length - 1]}
                alt="Uploaded Product"
                className="mx-auto mb-4 w-40 h-40 rounded-lg border"
              />
            ) : (
              <label className="mx-auto mb-4 w-40 h-40 rounded-lg border border-dashed flex items-center justify-center text-gray-500 cursor-pointer hover:bg-amber-50">
                <span className="text-sm">+ Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-sm font-medium">{productName || "No Name provided"}</p>
            <p className="text-sm text-gray-600">{productDescription || "No description provided."}</p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-18 h-18 rounded-full border-2 border-orange-400 flex items-center justify-center">
              <img src="images/arrow.png" alt="arrow.png" />
            </div>
          </div>

          <div className="text-center">
            <img
              src="/images/4.jpg"
              alt="Samsung Galaxy S21 5G"
              className="mx-auto mb-4 w-40 h-40 rounded-lg border"
            />
            <p className="text-sm">Samsung Electronics Samsung</p>
            <p className="text-sm font-medium">Galaxy S21 5G</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSendRequest}
            className="mt-4 border border-blue-400 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer"
          >
            Send Exchange Request
          </button>
        </div>
      </div>

      {/* Seller Info */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-medium mb-6">Product Owner</h2>

        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img
                src="/images/1.jpg"
                alt="Seller Avatar"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">Murli Vijay</p>
                <p className="text-sm text-gray-600">Candolim-Bardez, Goa</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p><span className="text-gray-600">Email:</span> murvij@gmail.com</p>
              <p><span className="text-gray-600">Sec Email:</span> mvj@gmail.com</p>
              <p><span className="text-gray-600">Phone:</span> +91 11111 22222</p>
            </div>
            <div className="flex items-center mt-4">
              <button className="mt-4 border border-orange-400 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer">
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-medium mb-4">Request Sent!</h2>
            <p className="text-gray-600">Your exchange request has been successfully sent.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 border border-blue-400 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
