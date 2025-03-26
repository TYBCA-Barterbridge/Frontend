import { useState, useEffect } from 'react';
import { FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPendingWorkshopsQuery, useHandleWorkshopApprovalMutation } from '../../features/admin/adminApiSlice';
import { setWorkshops, removeWorkshop } from '../../features/admin/adminSlice';
import { format } from 'date-fns';

const AdminWorkshops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [actionType, setActionType] = useState(null);
  const dispatch = useDispatch();

  const { data: workshopsData, isLoading, error } = useGetPendingWorkshopsQuery();
  const [handleWorkshopApproval] = useHandleWorkshopApprovalMutation();

  useEffect(() => {
    if (workshopsData) {
      dispatch(setWorkshops(workshopsData));
    }
  }, [workshopsData, dispatch]);

  const handleApproveWorkshop = (workshopId) => {
    setSelectedWorkshop(workshopId);
    setActionType('approve');
    setShowConfirmModal(true);
  };

  const handleRejectWorkshop = (workshopId) => {
    setSelectedWorkshop(workshopId);
    setActionType('reject');
    setShowConfirmModal(true);
    console.log(workshopId);
  };

  const confirmAction = async () => {
    if (!selectedWorkshop) return;
    console.log(selectedWorkshop);
    try {
      await handleWorkshopApproval({ 
        workshopId: selectedWorkshop, 
        status: actionType === 'approve' ? 'approved' : 'rejected'
      }).unwrap();
      dispatch(removeWorkshop(selectedWorkshop));
      setShowConfirmModal(false);
      setSelectedWorkshop(null);
      setActionType(null);
    } catch (error) {
      console.error(`Error ${actionType}ing workshop:`, error);
    }
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}Z`);
    const endTime = new Date(`1970-01-01T${end}Z`);
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert ms to hours
    return durationInHours === 1 ? "1 hour" : `${durationInHours} hours`;
  };
  
  const workshops = useSelector(state => state.admin.workshops);

  const filteredWorkshops = workshops?.filter(workshop => {
    const matchesSearch = 
      workshop.workshop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.GeneralUser?.User?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.workshop_id.toString().includes(searchTerm);

    const matchesStatus = 
      selectedStatus === 'all' ||
      workshop.approval_status === selectedStatus;

    return matchesSearch && matchesStatus;
  }) || [];

  if (isLoading) return (
    <div className="p-6 flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 flex items-center justify-center min-h-[400px]">
      <div className="text-red-600 bg-red-50 p-4 rounded-lg">
        Error loading workshops. Please try again later.
      </div>
    </div>
  );

  const ConfirmModal = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">
          {actionType === 'approve' ? 'Approve Workshop' : 'Reject Workshop'}
        </h3>
        <p className="mb-6 text-gray-600">
          Are you sure you want to {actionType} this workshop? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg ${
              actionType === 'approve' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Workshop Requests</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search workshops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workshop ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
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
              {filteredWorkshops.map((workshop) => (
                <tr key={workshop.workshop_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workshop.workshop_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workshop.workshop_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workshop.GeneralUser?.User?.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(`${workshop.workshop_date}T${workshop.workshop_starttime}`), 'PPP p')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <p> {calculateDuration(workshop.workshop_starttime, workshop.workshop_endtime)}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      workshop.approval_status === 'approved' ? 'bg-green-100 text-green-800' :
                      workshop.approval_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {workshop.approval_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workshop.approval_status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApproveWorkshop(workshop.workshop_id)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Approve Workshop"
                        >
                          <FaCheck className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRejectWorkshop(workshop.workshop_id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Reject Workshop"
                        >
                          <FaTimes className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          onClose={() => {
            setShowConfirmModal(false);
            setSelectedWorkshop(null);
            setActionType(null);
          }}
          onConfirm={confirmAction}
        />
      )}
    </div>
  );
};

export default AdminWorkshops; 