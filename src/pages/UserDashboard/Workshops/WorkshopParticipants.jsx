import React, { useState } from "react";
import {
  useGetWorkshopParticipantsQuery,
  useEditParticipantStatusMutation,
} from "../../../features/workshop/workshopApiSlice";
import { format } from "date-fns";
import { FaSpinner, FaStar, FaUser, FaCalendar, FaTimes } from "react-icons/fa";

const WorkshopParticipants = ({ closeModal, workshopId }) => {
  console.log(workshopId);
  const { data: workshop = [], isLoading: isWorkshopLoading, refetch } =
    useGetWorkshopParticipantsQuery(workshopId);
  const [editParticipantStatus, { isLoading: isStatusUpdating }] =
    useEditParticipantStatusMutation();
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [error, setError] = useState("");
  console.log(workshop);
  console.log(workshopId);
  // Example workshop data structure
  // {

  const handleStatusChange = async (participantId, newStatus) => {
    try {
      await editParticipantStatus({
        workshop_id: workshopId,
        participant_id: participantId,
        status: newStatus,
      }).unwrap();
      refetch(); // Refetch the participants after updating status
      setError("");
    } catch (err) {
      setError(err.data?.message || "Failed to update participant status");
    }
  };

  if (isWorkshopLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  if (workshop?.length === 0) {
    return (
      <div className="p-2 z-index-50 top">
        <div className="bg-yellow-100 border shadow-2xl border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <strong className="font-bold">No Participants!</strong>
          <p className="mt-1">No participants have registered for this workshop.</p>
        </div>
      </div>
    )}

  if (!workshop) {
    return (
      <div className="p-4">
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <p className="mt-1">Failed to load workshop data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {workshop[0].workshop_name}
              </h2>
              <p className="text-gray-600">
                <FaCalendar className="inline mr-2" />
                {format(new Date(workshop[0].workshop_date), "MMMM dd, yyyy")}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workshop?.map((participant) => (
                    <tr key={participant.participant_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {participant.profile_picture ? (
                            <img
                              className="h-10 w-10 rounded-full mr-4"
                              src={participant.profile_picture}
                              alt={participant.username}
                            />
                          ) : (
                            <FaUser className="h-10 w-10 text-gray-400 mr-4" />
                          )}

                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {participant.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {participant.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(
                            new Date(participant.createdAt),
                            "MMM dd, yyyy"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            participant.payment_status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {participant.payment_info}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            participant.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : participant.status === "left"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {participant.status || "joined"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={participant.status || "joined"}
                          onChange={(e) =>
                            handleStatusChange(
                              participant.participant_id,
                              e.target.value
                            )
                          }
                          disabled={isStatusUpdating}
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="joined">Joined</option>
                          <option value="left">Left</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopParticipants;
