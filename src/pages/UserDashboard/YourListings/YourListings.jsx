import React, { useState } from "react";
import UploadPage from "./UploadPage";
import EditPage from "./EditPage";
import {
  useGetGoodbyUserQuery,
  useDeleteGoodMutation,
} from "../../../features/good/goodApiSlice";
import {
  useGetSkillbyUserQuery,
  useDeleteSkillMutation,
} from "../../../features/skill/skillApiSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion } from "framer-motion";

const YourListings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const { data: goods = [], refetch: refetchGoods } = useGetGoodbyUserQuery();
  const { data: skills = [], refetch: refetchSkills } =
    useGetSkillbyUserQuery();
  const [deleteGood] = useDeleteGoodMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const openeditModal = (item) => {
    setSelectedItem(item);
    setIseditModalOpen(true);
    setShowOptions(null);
  };

    const openConfirmationModal = (item) => {
    console.log(item);
    setSelectedItem(item);
    setIsConfirmationOpen(true);
    setShowOptions(null);
  };

  const handleDelete = async () => {
    const good_id = selectedItem.good_id;
    const skill_id = selectedItem.skill_id;
    console.log('Selected Item:', selectedItem);
    console.log('Good ID:', good_id);
    console.log('Skill ID:', skill_id);
    try {
      if (selectedItem.good_name) {
        console.log('Deleting good with ID:', good_id);
        await deleteGood(good_id).unwrap();
      } else {
        console.log('Deleting skill with ID:', skill_id);
        await deleteSkill(skill_id).unwrap();
      }
      setIsConfirmationOpen(false);
      refetchGoods();
      refetchSkills();
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const closeeditModal = () => {
    setIseditModalOpen(false);
    refetchGoods();
    refetchSkills();
  };

  const closeConfirmationModal = () => setIsConfirmationOpen(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    refetchGoods();
    refetchSkills();
  };

  const listings = [...goods, ...skills];

  return (
    <div className="bg-gradient-to-b shadow-md  shadow-gray-400  rounded-xl min-h-screen py-12">
      {/* Header */}
      <div className="container mx-auto px-4 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Your Listings</h1>
          <select className="border border-gray-200 text-sm p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f48024] bg-white shadow-sm hover:border-gray-300 transition-colors duration-200">
            <option>Products</option>
          </select>
        </div>

        {/* Listings Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Add Button */}
          <motion.div
            className="flex flex-col items-center justify-center w-full h-[300px] bg-white border-2 border-dashed border-gray-200 rounded-xl text-[#f48024] font-bold cursor-pointer hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
            onClick={openModal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-6xl mb-3">+</div>
            <p className="text-lg">Add Product/Skill</p>
          </motion.div>

          {/* Listings */}
          {listings.map((item, index) => (
            <motion.div
              key={`listing-${index}`}
              className="relative bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={
                    item.Good_imgs?.[0]?.img_url ||
                    item.Skill_imgs?.[0]?.img_url ||
                    "/placeholder.svg"
                  }
                  alt={item.good_name || item.skill_name || "Listing"}
                  className="w-full h-full object-coontain transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                  {item.good_name || item.skill_name}
                </h3>
                <p className="text-sm text-gray-600 truncate line-clamp-2">
                  {item.good_description || item.skill_description}
                </p>
              </div>
              <div className="absolute top-3 right-3">
                <BsThreeDotsVertical
                  className="size-6 text-gray-500 cursor-pointer hover:text-[#f48024] transition-colors duration-200 bg-white/80 p-1 rounded-full hover:bg-white"
                  onClick={() =>
                    setShowOptions(showOptions === index ? null : index)
                  }
                />
                {showOptions === index && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-10 min-w-[160px] py-1">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => openeditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      onClick={() => openConfirmationModal(item)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && <UploadPage closeModal={closeModal} />}
      {iseditModalOpen && (
        <EditPage closeModal={closeeditModal} selectedItem={selectedItem} />
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                onClick={closeConfirmationModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default YourListings;
