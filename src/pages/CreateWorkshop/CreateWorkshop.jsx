import UploadPage from "../UploadPage/UploadPage";
import Editpage from "../editPage/editPage";
import { useGetGoodbyUserQuery } from "../../features/good/goodApiSlice";
import { useGetSkillbyUserQuery } from "../../features/skill/skillApiSLice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

const CreateWorkshop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);
  const { data: goods = [] } = useGetGoodbyUserQuery();
  const { data: skills = [] } = useGetSkillbyUserQuery();
  const [selectedItem, setSelectedItem] = useState(null);

  const openeditModal = (item) => {
    setSelectedItem(item);
    setIseditModalOpen(true);
  };

  const closeeditModal = () => setIseditModalOpen(false);

  // Combine goods and skills into a single list
  const listings = [...goods, ...skills];
  console.log(listings);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0f9bb7] h-10 -mt-10"></div>

      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Your Workshop</h1>

        </div>

        {/* Listings Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 bg-gray-100 p-6">
          {/* Add Product/Skill Button */}
          <div
            className="flex flex-col items-center justify-center w-[210px] h-[250px] border-2 border-dashed border-gray-300 rounded-lg text-[#f48024] font-bold cursor-pointer hover:bg-gray-200"
            onClick={openModal}
          >
            <div className="text-4xl mb-2">+</div>
            <p>Add Workshop</p>
          </div>

          {/* Render Listings */}
          {listings.map((item, index) => (
            <div
              key={`listing-${index}`}
              className="w-[280px] h-[350px] border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white"
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
              <div className="p-2 text-center">
                <p className="font-semibold">
                  {item.good_name || item.skill_name}
                </p>
                <div className="text-xs text-gray-600 break-words">
                  {item.good_description || item.skill_description}
                </div>
              </div>
              <div>
                <button className=" text-white p-2 rounded ">
                  <BsThreeDotsVertical
                    className="text-[#0f9bb7] size-5"
                    onClick={() => openeditModal(item)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <UploadPage closeModal={closeModal} />}
      {iseditModalOpen && (
        <Editpage closeModal={closeeditModal} selectedItem={selectedItem} />
      )}
    </>
  );
};

export default CreateWorkshop;
