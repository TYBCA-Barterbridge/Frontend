import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useGetAllWorkshopsQuery } from "../../features/workshop/workshopApiSlice";
import { setWorkshops, setSelectedWorkshop } from "../../features/workshop/workshopSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const WorkShop = () => {
    const { data: workshops, isLoading, error } = useGetAllWorkshopsQuery();
    console.log(workshops)
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState("All Workshops");
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const { user_id } = useAuth();

    useEffect(() => {
      AOS.init({ duration: 400 });
    }, []);

    useEffect(() => {
      if (workshops) {
        const filteredWorkshops = workshops.filter((workshop) => {
          const createdby = workshop.workshop_admin 
          return createdby !== user_id;
        })
        dispatch(setWorkshops({ workshops: filteredWorkshops }));
        setFilteredWorkshops(filteredWorkshops);
      }
    }, [workshops, dispatch]);


    if (isLoading) {
      return (
        <div className="container mx-auto mt-8 mb-8 py-4 px-9 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mx-auto mt-8 mb-8 py-4 px-9 text-center text-red-600">
          Error loading workshops. Please try again later.
        </div>
      );
    }
    
    return (
        <div className="container mx-auto mt-8 mb-8 py-4 px-9 w-full max-w-screen-2xl">
          <h2 className="text-3xl font-semibold mb-6">Featured Workshops</h2> 
          <div className="flex items-center gap-6 mb-6 pb-2 overflow-x-auto">
            <span 
              className={`cursor-pointer ${activeCategory === "All Workshops" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
              onClick={() => handleCategoryClick("All Workshops")}
            >
              All Workshops
            </span>
            
            <Link to="/Workshop" className="text-orange-500 font-medium ml-auto cursor-pointer">
               Browse All Workshops →
            </Link>
          </div>
          <div className="grid grid-cols-1 bg-gray-100 p-6 rounded-xl h-190 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          data-aos="zoom-in">
           {filteredWorkshops && filteredWorkshops.length > 0 ? (
             filteredWorkshops.map((workshop) => (
              <div
                key={workshop.workshop_id}
                className="border-none p-2.5 rounded-lg shadow-sm w-[330px] h-[350px] bg-white"
              >
                <Link 
                  to={`/Workshop/${workshop.workshop_id}`}
                  onClick={() => dispatch(setSelectedWorkshop({ selectedWorkshop: workshop }))}
                >
                  <img
                    src={`/${workshop.Workshop_imgs?.[0]?.img_url}` || "/placeholder.svg"}
                    alt={workshop.workshop_name}
                    className="w-full h-[220px] rounded-md transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
                <h4 className="text-lg font-bold mb-2.5">{workshop.workshop_name}</h4>
                <p className="text-sm mb-2.5 text-gray-600">
                {workshop.workshop_description 
                    ? workshop.workshop_description.length > 20 
                      ? workshop.workshop_description.substring(0, 20) + '...'
                      : workshop.workshop_description
                    : "No description"}
                </p> 
                <p className="flex text-lg font-bold text-blue-500 ">
                  <FaRupeeSign className="size-5 flex translate-y-1"/>{workshop.fee}
                </p>
              </div>
            ))
           ) : (
             <div className="col-span-full text-center text-gray-500">No workshops found in this category</div>
           )}
          </div>
        </div>
    );
};

export default WorkShop;
  