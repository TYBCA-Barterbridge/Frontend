import { 
  useGetSkillQuery,
 } from "../../features/skill/skillApiSlice";
 import { useDispatch } from "react-redux";
 import { FaRupeeSign } from "react-icons/fa";
import { setskills, setselectedskill } from "../../features/skill/skillSlice";
import { Link } from "react-router-dom";



const Skills = () => {
    const { data: skills } = useGetSkillQuery();
    const products = skills || [];
    const dispatch = useDispatch();

    if (skills) {
        dispatch(setskills({ skills }));
    }

  
    return (
       
        <div className="container mx-auto mt-8 mb-8 py-4 px-9 w-full max-w-screen-2xl">
          
          <div className="bg-gray-50 flex flex-wrap gap-5 flex-grow rounded-lg p-5 mr-10 mb-10">
          {products.map((product) => (
            <div
              key={product.skill_id}
              className="border-none p-2.5 rounded-lg shadow-sm w-[330px] h-[350px] bg-white"
            >
              <Link 
                to="/Product"
                onClick={() => dispatch(setselectedskill({ selectedskill: product }))}
              >
                <img
                  src={product.Skill_imgs[0].img_url || "/placeholder.svg"}
                  alt={product.skill_name}
                  className="w-full h-[220px] rounded-md transition-transform duration-300 hover:scale-[1.03]"
                />
              </Link>
              <h4 className="text-lg font-bold mb-2.5">{product.skill_name}</h4>
              <p className="text-sm mb-2.5 text-gray-600">
                {product.skill_description}
              </p>
              <p className="flex text-lg font-bold text-blue-500 ">
                <FaRupeeSign className="size-5 flex translate-y-1"/>{product.skill_amount}
              </p>
            </div>
          ))}
        </div>
        </div>
      
      

    );
  };
  
  export default Skills;
  