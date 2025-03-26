import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGetWorkshopsByUserQuery, useGetWorkshopByAdminQuery } from "../../../features/workshop/workshopApiSlice";
import WorkshopUpload from "./WorkshopUpload";
import WorkshopEdit from "./WorkshopEdit";

const Workshops = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: workshops = [], isLoading } = useGetWorkshopsByUserQuery();
  const { data: workshopsAdmin = [], isLoadingAdmin } = useGetWorkshopByAdminQuery();
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  console.log(workshopsAdmin);

  const openEditModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedWorkshop(null);
    setIsEditModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading || isLoadingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-100 rounded-lg container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Your Workshops</h1>
        </div>

        {/* Workshops Grid */}
        <div className="bg-white p-3 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Workshop Button */}
          <div
            className="flex flex-col items-center justify-center w-[480px] h-[400px] border-2 border-dashed border-gray-300 rounded-lg text-[#f48024] font-bold cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={openModal}
          >
            <div className="text-4xl mb-2">+</div>
            <p>Add Workshop</p>
          </div>

          {/* Workshop Cards */}
          {workshopsAdmin.map((workshop) => (
            <div
              key={workshop.workshop_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`/${workshop.Workshop_imgs?.[0]?.img_url}` || "/placeholder.svg"}
                alt={workshop.workshop_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">{workshop.workshop_name}</h3>
                  <button
                    onClick={() => openEditModal(workshop)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <BsThreeDotsVertical />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">{workshop.workshop_description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {new Date(workshop.workshop_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Time:</span> {workshop.workshop_starttime} - {workshop.workshop_endtime}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Fee:</span> ₹{workshop.fee}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#f48024]">
                    ₹{workshop.fee}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {workshop.approval_status || 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && <WorkshopUpload closeModal={closeModal} />}
      {isEditModalOpen && (
        <WorkshopEdit
          closeModal={closeEditModal}
          selectedWorkshop={selectedWorkshop}
        />
      )}
    </>
  );
};

export default Workshops;