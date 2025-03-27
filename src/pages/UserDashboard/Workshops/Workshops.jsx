import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGetWorkshopByUserQuery, useGetWorkshopByAdminQuery, useAddReviewMutation } from "../../../features/workshop/workshopApiSlice";
import WorkshopUpload from "./WorkshopUpload";
import WorkshopEdit from "./WorkshopEdit";
import { format } from 'date-fns';
import { FaSpinner, FaStar, FaCalendar, FaClock, FaRupeeSign } from 'react-icons/fa';
import WorkshopParticipants from './WorkshopParticipants';

const Workshops = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: workshops = [], isLoading } = useGetWorkshopByUserQuery();
  const { data: workshopsAdmin = [], isLoadingAdmin } = useGetWorkshopByAdminQuery();
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });
  const [error, setError] = useState('');
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);

  const [addReview, { isLoading: isReviewLoading }] = useAddReviewMutation();

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

  const handleReviewSubmit = async () => {
    try {
      await addReview({
        workshop_id: selectedWorkshop.workshop_id,
        rating: reviewData.rating,
        comment: reviewData.comment
      }).unwrap();
      setShowReviewModal(false);
      setSelectedWorkshop(null);
      setReviewData({ rating: 5, comment: '' });
      setError('');
    } catch (err) {
      setError(err.data?.message || 'Failed to submit review');
    }
  };

  const handleParticipantsClick = (workshopId) => {
    setSelectedWorkshopId(workshopId);
    setShowParticipantsModal(true);
  };

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
            className="flex flex-col items-center justify-center w-[380px] h-[440px] border-2 border-dashed border-gray-300 rounded-lg text-[#f48024] font-bold cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={openModal}
          >
            <div className="text-4xl mb-2">+</div>
            <p>Add Workshop</p>
          </div>

          {/* Workshop Cards */}
          {workshopsAdmin.map((workshop) => (
            <div
              key={workshop.workshop_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(workshop);
                  }}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                >
                  <BsThreeDotsVertical className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <img
                src={`/${workshop.Workshop_imgs?.[0]?.img_url}` || "/placeholder.svg"}
                alt={workshop.workshop_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{workshop.workshop_name}</h3>
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

      {/* Workshops Joined Section */}
      <div className="bg-gray-100 rounded-lg container mx-auto px-4 py-6 mt-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Workshops Joined</h1>
        </div>

        {/* Workshops Grid */}
        <div className="bg-white p-3 rounded-lg">
          {workshops?.filter(workshop => !workshop.is_admin).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No workshops joined yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops?.filter(workshop => !workshop.is_admin).map((workshop) => (
                <div
                  key={workshop.workshop_id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
                  onClick={() => {
                    setSelectedWorkshop(workshop);
                    setShowReviewModal(true);
                  }}
                >
                  <div className="relative">
                    <img
                      src={`/${workshop.Workshop_imgs?.[0]?.img_url}` || "/placeholder.svg"}
                      alt={workshop.workshop_name}
                      className="w-full h-48 object-cover"
                    />
                    {workshop.review && (
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{workshop.review.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{workshop.workshop_name}</h3>
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
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Joined
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Review Modal */}
      {showReviewModal && selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Workshop Details</h3>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedWorkshop(null);
                  setReviewData({ rating: 5, comment: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <img
                src={selectedWorkshop.Workshop_imgs?.[0]?.img_url || '/placeholder.svg'}
                alt={selectedWorkshop.workshop_name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">{selectedWorkshop.workshop_name}</h4>
              <p className="text-gray-600 mb-4">{selectedWorkshop.workshop_description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaCalendar className="mr-2" />
                  {format(new Date(selectedWorkshop.workshop_date), 'MMMM dd, yyyy')}
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  {selectedWorkshop.workshop_starttime} - {selectedWorkshop.workshop_endtime}
                </div>
                <div className="flex items-center">
                  <FaRupeeSign className="mr-2" />
                  {selectedWorkshop.fee}
                </div>
              </div>
            </div>

            {!selectedWorkshop.review && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Add Your Review</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        className="focus:outline-none"
                      >
                        <FaStar
                          className={`text-2xl ${
                            star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="4"
                    placeholder="Share your experience with this workshop..."
                  />
                </div>
                {error && (
                  <div className="mb-4 text-red-600 text-sm">{error}</div>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setShowReviewModal(false);
                      setSelectedWorkshop(null);
                      setReviewData({ rating: 5, comment: '' });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReviewSubmit}
                    disabled={isReviewLoading}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                  >
                    {isReviewLoading ? (
                      <span className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" />
                        Submitting...
                      </span>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WorkshopParticipants modal */}
      {showParticipantsModal && (
        <WorkshopParticipants
          workshopId={selectedWorkshopId}
          closeModal={() => {
            setShowParticipantsModal(false);
            setSelectedWorkshopId(null);
          }}
        />
      )}
    </>
  );
};

export default Workshops;