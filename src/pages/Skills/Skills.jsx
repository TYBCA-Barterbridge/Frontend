import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useGetSkillQuery } from "../../features/skill/skillApiSlice";
import { setskills, setselectedskill } from "../../features/skill/skillSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";

const FeaturedSkills = () => {
    const { data: skills, isLoading } = useGetSkillQuery();
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState("All Skills");

    useEffect(() => {
      AOS.init({ duration: 400 });
    }, []);

    useEffect(() => {
      if (skills) {
        dispatch(setskills({ skill: skills }));
      }
    }, [skills, dispatch]);

    const handleCategoryClick = (category) => {
      setActiveCategory(category);
      if (!skills) return;

      if (category === "All Skills") {
        dispatch(setskills({ skill: skills }));
        console.log(skills);
      } else {
        const filteredSkills = skills.filter(skill => 
          skill.Category && skill.Category.category_name === category
        );
        dispatch(setskills({ skill: filteredSkills }));
        console.log(filteredSkills);
      }
    }

    const products = useSelector(state => state.skill.skill);
    console.log(products);
    //displays undefined
    
    if (isLoading) {
      return <div className="container mx-auto mt-8 mb-8 py-4 px-9">Loading...</div>;
    }
    
    return (
        <div className="container mx-auto mt-8 mb-8 py-4 px-9 w-full max-w-screen-2xl">
          <h2 className="text-3xl font-semibold mb-6">Skills</h2> 
          <div className="flex items-center gap-6 mb-6 border-b pb-2">
            <span 
              className={`cursor-pointer ${activeCategory === "All Skills" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
              onClick={() => handleCategoryClick("All Skills")}
            >
              All Skills
            </span>
            <span 
              className={`cursor-pointer ${activeCategory === "Gaming" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
              onClick={() => handleCategoryClick("Gaming")}
            >
              Gaming
            </span>
            <span 
              className={`cursor-pointer ${activeCategory === "Instrument" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
              onClick={() => handleCategoryClick("Instrument")}
            >
              Instrument
            </span>
            <span 
              className={`cursor-pointer ${activeCategory === "Finance" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
              onClick={() => handleCategoryClick("Finance")}
            >
              Finance
            </span>
            <span 
              className={`cursor-pointer ${activeCategory === "Education" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
              onClick={() => handleCategoryClick("Education")}
            >
              Education
            </span>
            <Link to="/Skills" className="text-orange-500 font-medium ml-auto cursor-pointer">
               Browse All Skills →
            </Link>
          </div>
          <div className="grid grid-cols-1 bg-gray-50 p-6 rounded-xl h-190 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          data-aos="zoom-in">
           {products && products.length > 0 ? (
             products.map((product) => (
              <div
                key={product.skill_id}
                className="border-none p-2.5 rounded-lg shadow-sm w-[330px] h-[350px] bg-white"
              >
                <Link 
                  to="/Product"
                  onClick={() => dispatch(setselectedskill({ selectedskill: product }))}
                >
                  <img
                    src={product.Skill_imgs?.[0]?.img_url || "/placeholder.svg"}
                    alt={product.skill_name}
                    className="w-full h-[220px] rounded-md transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
                <h4 className="text-lg font-bold mb-2.5">{product.skill_name}</h4>
                <p className="text-sm mb-2.5 text-gray-600">
                {product.skill_description 
                    ? product.skill_description.length > 20 
                      ? product.skill_description.substring(0, 20) + '...'
                      : product.skill_description
                    : "No description"}
                </p> 
                <p className="flex text-lg font-bold text-blue-500 ">
                  <FaRupeeSign className="size-5 flex translate-y-1"/>{product.skill_amount}
                </p>
              </div>
            ))
           ) : (
             <div className="col-span-full text-center text-gray-500">No skills found in this category</div>
           )}
          </div>
        </div>
    );
};

export default FeaturedSkills;
  