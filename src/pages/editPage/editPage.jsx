import React, { useRef, useState } from "react";
import { useUpdateGoodMutation } from "../../features/good/goodApiSlice";
import { useUpdateSkillMutation } from "../../features/skill/skillApiSLice";

const Editpage = ({ closeModal }) => {
  const modalRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [updateGood, { isLoading }] = useUpdateGoodMutation();
  const [updateSkill, { isLoading: skillLoading }] = useUpdateSkillMutation();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [images, setImages] = useState([]);
  const [isGood, setIsGood] = useState(true);

  const categories = [
    "Technology",
    "Art",
    "Music",
    "Cooking",
    "Gardening",
    "Fitness",
    "Fashion",
    "Photography",
    "Writing",
    "Sports",
    "Travel",
    "Education",
    "DIY Crafts",
    "Health & Wellness",
    "Gaming",
    "Programming",
    "Languages",
    "Marketing",
    "Home Improvement",
    "Entrepreneurship",
  ];

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images
    if (files.length + images.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...files]);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setCategory(categories[selectedIndex]);
    setCategoryIndex(selectedIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("amount", amount);
    data.append("desc", description);
    data.append("category_id", categoryIndex);
    images.forEach((image) => data.append("images", image));

    if (isGood) {
      await updateGood(data).unwrap();
    } else {
      await updateSkill(data).unwrap();
    }

    closeModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md max-h-screen rounded-lg p-6 relative shadow-lg overflow-y-auto"
      >
        <button
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-orange-500 transition-transform transform hover:rotate-90"
          onClick={closeModal}
        >
          ✕
        </button>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          {isGood ? "Upload Good" : "Upload Skill"}
        </h2>

        <div className="text-center mb-6">
          <label
            className="w-44 h-40 border-2 border-dashed border-orange-500 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-orange-600 transition"
            htmlFor="upload-images"
          >
            <input
              id="upload-images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-3xl text-orange-500">+</span>
            <p className="text-gray-600">Upload more images</p>
          </label>
        </div>

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

        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800">Product Type</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="productType"
                checked={isGood}
                onChange={() => setIsGood(true)}
                className="form-radio text-orange-500"
              />
              <span className="text-gray-700">Good</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="productType"
                checked={!isGood}
                onChange={() => setIsGood(false)}
                className="form-radio text-orange-500"
              />
              <span className="text-gray-700">Skill</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              className="w-full p-2 border rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Category:</label>
            <select
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              onChange={handleCategoryChange}
            >
              <option value="">Select a Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`mt-6 w-full bg-orange-500 text-white py-2 rounded-lg font-bold text-lg transition-transform transform hover:scale-105 ${
              isLoading || skillLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading || skillLoading}
          >
            {isLoading || skillLoading ? "Uploading..." : isGood ? "Add Good →" : "Add Skill →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editpage;