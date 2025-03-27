import { useState } from 'react';
import { BiSearch, BiFilter } from 'react-icons/bi';
import { useGetWorkshopParticipantsQuery, useUpdateParticipantStatusMutation } from '../../features/workshop/workshopApiSlice';

export default function WorkshopMemberManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWorkshop, setSelectedWorkshop] = useState('all');

  const { data: participants, isLoading } = useGetWorkshopParticipantsQuery();
  const [updateStatus] = useUpdateParticipantStatusMutation();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  // Get unique workshops for filter
  const workshops = [...new Set(participants?.map(p => p.workshop_name) || [])];

  // Filter participants
  const filteredParticipants = participants?.filter(participant => {
    const matchesSearch = participant.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || participant.status === selectedStatus;
    const matchesWorkshop = selectedWorkshop === 'all' || participant.workshop_name === selectedWorkshop;
    return matchesSearch && matchesStatus && matchesWorkshop;
  });

  const handleStatusUpdate = async (participantId, newStatus) => {
    try {
      await updateStatus({
        participant_id: participantId,
        status: newStatus
      }).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Workshop Member Management</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border rounded-md"
          />
        </div>
        <select
          value={selectedWorkshop}
          onChange={(e) => setSelectedWorkshop(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Workshops</option>
          {workshops.map(workshop => (
            <option key={workshop} value={workshop}>{workshop}</option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Workshop
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Date
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
            {filteredParticipants?.map(participant => (
              <tr key={participant.participant_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {participant.user_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {participant.user_email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{participant.workshop_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(participant.registration_date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    participant.status === 'approved' ? 'bg-green-100 text-green-800' :
                    participant.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    participant.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {participant.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(participant.participant_id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(participant.participant_id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {participant.status === 'approved' && (
                      <button
                        onClick={() => handleStatusUpdate(participant.participant_id, 'completed')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredParticipants?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No participants found matching your criteria
        </div>
      )}
    </div>
  );
} 