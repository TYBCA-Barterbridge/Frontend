import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useGetWorkshopByAdminQuery,
  useDeleteWorkshopMutation,
  useGetWorkshopByUserQuery,
  useAddReviewMutation,
} from "../../../features/workshop/workshopApiSlice";
import WorkshopUpload from "./WorkshopUpload";
import WorkshopEdit from "./WorkshopEdit";
import WorkshopParticipants from "./WorkshopParticipants";
import { motion } from "framer-motion";

const Workshops = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open
  const {
    data: workshopsAdmin = [],
    isLoading: isLoadingAdmin,
    refetch: refetchAdmin,
  } = useGetWorkshopByAdminQuery();
  const [deleteWorkshop] = useDeleteWorkshopMutation();
  const {
    data: workshopsUser = [],
    isLoading: isLoadingjoined,
    refetch: refetchUser,
  } = useGetWorkshopByUserQuery();
  const [addReview, { isLoading: isReviewUpdating }] = useAddReviewMutation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState();
  const [rating, setRating] = useState(0);
  console.log(workshopsUser);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

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

  const openReviewModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsReviewModalOpen(true);
  };
  const closeReviewModal = () => {
    setSelectedWorkshop(null);
    setIsReviewModalOpen(false);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const data = {
      workshop_id: selectedWorkshop.workshop_id,
      review: review,
      rating: rating,
    };
    try {
      await addReview(data).unwrap();
      alert("Review submitted successfully!");
      closeReviewModal();
      refetchUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWorkshop = async (workshopId) => {
    try {
      await deleteWorkshop(workshopId).unwrap();
      alert("Workshop deleted successfully!");
      refetchAdmin();
    } catch (error) {
      console.error("Failed to delete workshop:", error);
      alert("Failed to delete workshop.");
    }
  };

  const handleParticipantsClick = (workshopId) => {
    setSelectedWorkshopId(workshopId);
    setShowParticipantsModal(true);
  };

  const toggleDropdown = (workshopId) => {
    setActiveDropdown((prev) => (prev === workshopId ? null : workshopId));
  };

  if (isLoadingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Modals */}
      {isModalOpen && <WorkshopUpload closeModal={closeModal} />}
      {isEditModalOpen && (
        <WorkshopEdit
          closeModal={closeEditModal}
          selectedWorkshop={selectedWorkshop}
        />
      )}
      {showParticipantsModal && (
        <WorkshopParticipants
          closeModal={() => setShowParticipantsModal(false)}
          workshopId={selectedWorkshopId}
        />
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg p-4 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Review
              </h2>
              <button
                onClick={closeReviewModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Existing Review */}
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm">
                <strong>Review:</strong>{" "}
                {selectedWorkshop.review || "No review yet"}
              </p>
              <p className="text-sm">
                <strong>Rating:</strong>{" "}
                {selectedWorkshop.rating || "No rating yet"}
              </p>
            </div>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="integer"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <div className="p-4">
        <div
          className=" bg-yellow-600 text-white px-4 py-3 rounded relative shadow-2xl"
          role="alert"
        >
          <h1 className="font-bold">Note:</h1>
          <p className="mt-1 ">
            * You can only edit or delete your workshops before it gets
            approved.
          </p>
          <p>
            * Once approved, you can only view the workshop and manage
            participants.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Your Workshops</h1>
        </div>

        {/* Workshops Created Section */}
        <motion.div
          className="bg-white p-3 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Add Workshop Button */}
          <motion.div
            className="flex flex-col items-center justify-center w-[380px] h-[440px] border-2 border-dashed border-gray-300 rounded-lg text-[#f48024] font-bold cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={openModal}
            variants={cardVariants}
          >
            <div className="text-4xl mb-2">+</div>
            <p>Add Workshop</p>
          </motion.div>

          {/* Workshop Cards */}
          {workshopsAdmin.map((workshop) => (
            <motion.div
              key={workshop.workshop_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
              variants={cardVariants}
            >
              <div className="absolute top-2 right-2 z-10">
                <div className="relative">
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => toggleDropdown(workshop.workshop_id)}
                  >
                    <BsThreeDotsVertical className="text-gray-500 hover:text-gray-700" />
                  </button>
                  {activeDropdown === workshop.workshop_id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                      <ul className="py-1">
                        {/* Edit Option */}
                        {workshop.approval_status !== "approved" && (
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              openEditModal(workshop);
                              setActiveDropdown(null);
                            }}
                          >
                            Edit
                          </li>
                        )}
                        {/* Delete Option */}
                        {workshop.approval_status !== "approved" && (
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                            onClick={() => {
                              handleDeleteWorkshop(workshop.workshop_id);
                              setActiveDropdown(null);
                            }}
                          >
                            Delete
                          </li>
                        )}
                        {/* Participants Option */}
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleParticipantsClick(workshop.workshop_id);
                            setActiveDropdown(null);
                          }}
                        >
                          Participants
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <img
                src={
                  `/${workshop.Workshop_imgs?.[0]?.img_url}` ||
                  "/placeholder.svg"
                }
                alt={workshop.workshop_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {workshop.workshop_name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {workshop.workshop_description}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(workshop.workshop_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Time:</span>{" "}
                    {workshop.workshop_starttime} - {workshop.workshop_endtime}
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
                    {workshop.approval_status || "Pending"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="bg-gray-100 rounded-lg container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Joined Workshops</h1>
        </div>

        {/* Workshops Created Section */}
        <motion.div
          className="bg-white p-3 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Workshop Cards */}
          {workshopsUser.map((workshop) => (
            <motion.div
              key={workshop.workshop_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
              variants={cardVariants}
            >
              <div className="absolute top-2 right-2 z-10">
                <div className="relative">
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => toggleDropdown(workshop.workshop_id)}
                  >
                    <BsThreeDotsVertical className="text-gray-500 hover:text-gray-700" />
                  </button>
                  {activeDropdown === workshop.workshop_id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                      <ul className="py-1">
                        {/* Edit Option */}
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            openReviewModal(workshop);
                            setActiveDropdown(null);
                          }}
                        >
                          Review
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <img
                src={
                  `/${workshop.Workshop.Workshop_imgs?.[0]?.img_url}` ||
                  "/placeholder.svg"
                }
                alt={workshop.Workshop.workshop_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {workshop.Workshop.workshop_name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {workshop.Workshop.workshop_description}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(
                      workshop.Workshop.workshop_date
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Time:</span>{" "}
                    {workshop.Workshop.workshop_starttime} -{" "}
                    {workshop.Workshop.workshop_endtime}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Fee:</span> ₹
                    {workshop.Workshop.fee}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#f48024]">
                    ₹{workshop.Workshop.fee}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Workshops;
