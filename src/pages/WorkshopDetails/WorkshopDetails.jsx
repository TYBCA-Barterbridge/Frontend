import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiLeftArrow, BiCalendar, BiTime, BiLocationPlus, BiUser } from 'react-icons/bi';
import { useGetWorkshopByIdQuery, useAddParticipantMutation } from '../../features/workshop/workshopApiSlice';
import { FaRupeeSign } from 'react-icons/fa';

export default function WorkshopDetails() {
  const { id } = useParams();
  console.log("WorkshopId:", id);
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const { data: workshop, isLoading, error } = useGetWorkshopByIdQuery(id);
  console.log(workshop);

  const [register] = useAddParticipantMutation();

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      setRegistrationError(null);
      await register({ workshop_id: id, fee: workshop.fee }).unwrap();
      navigate('/dashboard/workshops');
    } catch (err) {
      setRegistrationError(err.data?.message || 'Failed to register for workshop');
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error loading workshop details</div>;
  if (!workshop) return <div className="text-center p-4">Workshop not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <BiLeftArrow className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{workshop.workshop_name}</h1>
      </div>

      {/* Workshop Image */}
      <div className="mb-6">
        <img
          src={`/${workshop.Workshop_imgs[0]?.img_url}`}
          alt={workshop.workshop_name}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Workshop Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Workshop Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <BiCalendar className="h-5 w-5 text-gray-600 mr-2" />
              <span>{new Date(workshop.workshop_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <BiTime className="h-5 w-5 text-gray-600 mr-2" />
              <span>{workshop.workshop_starttime}</span>
            </div>
            <div className="flex items-center">
              <BiTime className="h-5 w-5 text-gray-600 mr-2" />
              <span>{workshop.workshop_endtime}</span>
            </div>
            <div className="flex items-center">
              <BiUser className="h-5 w-5 text-gray-600 mr-2" />
              <span>Instructor: {workshop.GeneralUser.User.username}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Registration</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Price: <span className="font-semibold flex items-center">
                <FaRupeeSign className="mr-1" />
                {workshop.fee}
              </span>
            </p>
            {registrationError && (
              <p className="text-red-500 text-sm">{registrationError}</p>
            )}
            <button
              onClick={handleRegister}
              disabled={isRegistering || workshop.available_spots === 0}
              className={`w-full mt-6 py-2 px-4 rounded-md text-white ${
                isRegistering || workshop.available_spots === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isRegistering ? 'Registering...' : 'Register for Workshop'}
            </button>
          </div>
        </div>
      </div>

      {/* Workshop Description */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-600 whitespace-pre-line">{workshop.workshop_description}</p>
      </div>
    </div>
  );
}
