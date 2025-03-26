import { Link } from "react-router-dom";
import { useGetWorkshopQuery } from "../../features/workshop/workshopApiSlice";

const WorkShop = () => {
  const { data: workshops = [], isLoading, isError } = useGetWorkshopQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">Error loading workshops</div>
      </div>
    );
  }

  return (
    <div className="w-full p-3"> 
      {/* Products Grid (4 Products Per Row) */}
      <div className="bg-gray-100 p-6 rounded-lg m-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {workshops.map((workshop) => (
          <div key={workshop.workshop_id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={workshop.Workshop_imgs?.[0]?.img_url || "/placeholder.svg"}
              alt={workshop.workshop_name}
              className="w-full h-44 rounded-md transition-transform transform hover:scale-105"
            />
            <h4 className="text-lg font-bold mt-3">{workshop.workshop_name}</h4>
            <p className="text-sm text-gray-600">{workshop.workshop_description}</p>
            <p className="text-md font-bold text-gray-800">₹{workshop.fee}</p>

            {/* Link to Detail Page */}
            <Link to={`/workshop/${workshop.workshop_id}`}>
              <p className="mt-2 text-center bg-blue-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-blue-600 w-28">
                Enroll Now
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkShop;
