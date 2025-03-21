import React, { useState } from "react";
import UploadPage from "../UploadPage/UploadPage";
import Editpage from "../editPage/editPage";
import {
  useGetGoodbyUserQuery,
  useDeleteGoodMutation,
} from "../../features/good/goodApiSlice";
import {
  useGetSkillbyUserQuery,
  useDeleteSkillMutation,
} from "../../features/skill/skillApiSLice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion } from "framer-motion";


const YourListings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(null); // State to control options modal
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
    setSelectedItem(item);
    setIsConfirmationOpen(true);
    setShowOptions(null); // Close options when confirming deletion
  };

  const handleDelete = async () => {
    if (selectedItem.good_name) {
      const good_id = selectedItem.good_id
      await deleteGood({good_id}).unwrap();
    } else {
      const skill_id = selectedItem.skill_id
      await deleteSkill({skill_id}).unwrap();
    }
    setIsConfirmationOpen(false);
    refetchGoods();
    refetchSkills();
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


  // Combine goods and skills into a single list
  const listings = [...goods, ...skills];

  return (
    <>

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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 bg-gray-100 p-6">
          {/* Add Product/Skill Button */}
          <div
            className="flex flex-col items-center justify-center w-[210px] h-[250px] border-2 border-dashed border-gray-300 rounded-lg text-[#f48024] font-bold cursor-pointer hover:bg-gray-200"
            onClick={openModal}
          >
            <div className="text-4xl mb-2">+</div>
            <p>Add Product/Skill</p>
          </div>

          {/* Render Listings */}
          {listings.map((item, index) => (
            <motion.div
              key={`listing-${index}`}
              className="w-[280px] h-[350px] border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            >
              <img
                src={
                  item.Good_imgs?.[0]?.img_url ||
                  item.Skill_imgs?.[0]?.img_url ||
                  "/placeholder.svg"
                }
                alt={item.good_name || item.skill_name || "Listing"}
                className="w-full h-[70%] object-contain"
              />
              <div className="p-10 text-center">
                <p className="font-semibold text-xl">
                  {item.good_name || item.skill_name}
                </p>
              </div>
              <div className="absolute top-2 right-2">
                <BsThreeDotsVertical
                  className="text-[#0f9bb7] size-5 cursor-pointer"
                  onClick={() => setShowOptions(showOptions === index ? null : index)}
                />
                {showOptions === index && (
                  <div className="absolute right-0 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <button
                      className="block px-[25px] py-2 text-left hover:bg-gray-200"
                      onClick={() => openeditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="block px-4 py-2 text-left hover:bg-gray-200"
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

      {/* Modal */}
      {isModalOpen && <UploadPage closeModal={closeModal} />}
      {iseditModalOpen && (
        <Editpage closeModal={closeeditModal} selectedItem={selectedItem} />
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 ">
          <div className="bg-white p-10 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-end mt-4">
              <button className="p-3 rounded-2xl hover:bg-gray-400  bg-gray-200 mr-6" onClick={closeConfirmationModal}>
                No
              </button>
              <button className="p-3 rounded-2xl hover:bg-red-600 bg-red-500 text-white" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourListings;
