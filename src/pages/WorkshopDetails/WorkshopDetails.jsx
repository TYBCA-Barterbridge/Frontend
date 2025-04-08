import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BiLeftArrow,
  BiCalendar,
  BiTime,
  BiLocationPlus,
  BiUser,
} from "react-icons/bi";
import {
  useGetWorkshopByIdQuery,
  useAddParticipantMutation,
} from "../../features/workshop/workshopApiSlice";
import { FaRupeeSign } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useJoinGroupMutation } from "../../features/groups/groupsApiSlice";
import { useSocket } from "../../contexts/SocketContext";
import toast from "react-hot-toast";

export default function WorkshopDetails() {
  const { socket } = useSocket();
  const { id } = useParams();
  const { user_id } = useAuth();
  console.log("WorkshopId:", id);
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const [registrationmodal, setRegistrationModal] = useState(false);

  useEffect(() => {
    if (!user_id) return;

    socket.connect();

    socket.on("joined-group", (data) => {
      toast.success(data.message); // or console.log(data)
    });

    return () => {
      socket.off("joined-group");
      socket.disconnect();
    };
  }, [user_id]);

  const { data: workshop, isLoading, error } = useGetWorkshopByIdQuery(id);
  console.log(workshop);

  const workshopparticipants = workshop?.WorkshopParticipants || [];
  const isRegistered = workshopparticipants.some(
    (participant) => participant.participant_id === user_id
  );

  const [register] = useAddParticipantMutation();
  const [joinGroup] = useJoinGroupMutation();

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      setRegistrationError(null);

      await register({ workshop_id: id, fee: workshop.fee }).unwrap();

      await joinGroup({ title: workshop.workshop_name }).unwrap();

      setRegistrationModal(false);
      navigate("/dashboard/workshops");
    } catch (err) {
      setRegistrationError(
        err.data?.message || "Failed to register for workshop"
      );
      setRegistrationModal(false);
      if (err.status === 401) {
        setUnauthorized(true);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center p-4">
        Error loading workshop details
      </div>
    );
  if (!workshop)
    return <div className="text-center p-4">Workshop not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <BiLeftArrow className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {workshop.workshop_name}
        </h1>
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
              <span>
                {new Date(workshop.workshop_date).toLocaleDateString()}
              </span>
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
              Price:{" "}
              <span className="font-semibold flex items-center">
                <FaRupeeSign className="mr-1" />
                {workshop.fee}
              </span>
            </p>
            {isRegistered ? (
              <button
                disabled
                className="w-full mt-6 py-2 px-4 rounded-md text-white bg-green-700"
              >
                Registered
              </button>
            ) : (
              <button
                onClick={() => setRegistrationModal(true)}
                disabled={isRegistering}
                className={`w-full mt-6 py-2 px-4 rounded-md text-white ${
                  isRegistering
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {unauthorized
                  ? "Login to Register"
                  : isRegistering
                  ? "Registering..."
                  : "Register for Workshop"}
              </button>
            )}
          </div>
        </div>
      </div>

      {registrationmodal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              Registration Confirmation
            </h2>
            <p className="text-gray-600">Registration Fee : {workshop.fee} </p>
            <p>Are you sure you want to register for this workshop?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setRegistrationModal(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workshop Description */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-600 whitespace-pre-line">
          {workshop.workshop_description}
        </p>
      </div>
    </div>
  );
}
