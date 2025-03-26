import React, { useRef, useState } from "react";
import { useUpdateGoodMutation } from "../../../features/good/goodApiSlice";
import { useUpdateSkillMutation } from "../../../features/skill/skillApiSlice";
import { BiRupee } from "react-icons/bi";


const Editpage = ({ closeModal, selectedItem }) => {
  const modalRef = useRef();
  const [id] = useState(selectedItem?.good_id || selectedItem?.skill_id || []);
  const [selectedImages, setSelectedImages] = useState(
    selectedItem?.Good_imgs || selectedItem?.Skill_imgs || []
  );
  const [updateGood, { isLoading }] = useUpdateGoodMutation();
  const [updateSkill, { isLoading: skillLoading }] = useUpdateSkillMutation();
  const [name, setName] = useState(
    selectedItem?.good_name || selectedItem?.skill_name || ""
  );
  const [amount, setAmount] = useState(
    selectedItem?.good_amount || selectedItem?.skill_amount || 0
  );
  const [description, setDescription] = useState(
    selectedItem?.good_description || selectedItem?.skill_description || ""
  );
  const [category, setCategory] = useState(selectedItem?.category_id || "");
  const [images, setImages] = useState([]);
  const [isGood, setIsGood] = useState(!!selectedItem?.good_name);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("good_id" || "skill_id", id);
    data.append("name", name);
    data.append("amount", amount);
    data.append("desc", description);
    data.append("category_id", category);
    images.forEach((image) => data.append("images", image));

    if (isGood) {
      await updateGood(data).unwrap();
    } else {
      await updateSkill(data).unwrap();
    }

    closeModal();
  };
  console.log(selectedImages);

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
          {isGood ? "Update Good" : "Update Skill"}
        </h2>

        {/* Existing Good Preview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Existing Good Preview
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {/* Existing Images */}
            {selectedImages.length > 0 && (
              <div className="flex gap-2 mb-4">
                {selectedImages.map((image, index) => {
                  // Access the img_url property from the image object
                  const img_url = image.img_url;

                  // Ensure img_url is a string and not null/undefined
                  if (typeof img_url === "string" && img_url.trim() !== "") {
                    return (
                      <img
                        key={index}
                        src={img_url.startsWith("/") ? img_url : `/${img_url}`}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    );
                  }
                  return null; // Skip invalid entries
                })}
              </div>
            )}

            {/* Existing Name */}
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {selectedItem?.good_name || selectedItem?.skill_name}
            </p>

            {/* Existing Description */}
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Description:</span>{" "}
              {selectedItem?.good_description ||
                selectedItem?.skill_description}
            </p>

            {/* Existing Price */}
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Price:</span> ₹
              {selectedItem?.good_amount || selectedItem?.skill_amount}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Edit Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Edit Description:</label>
            <textarea
              className="w-full p-2 border rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Edit Price:</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`mt-6 w-full bg-orange-500 text-white py-2 rounded-lg font-bold text-lg transition-transform transform hover:scale-105 ${
              isLoading || skillLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading || skillLoading}
          >
            {isLoading || skillLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editpage;
