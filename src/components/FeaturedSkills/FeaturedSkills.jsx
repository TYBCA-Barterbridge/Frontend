import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSkillQuery } from "../../features/skill/skillApiSlice";
import { FaRupeeSign } from "react-icons/fa";
import { setskills, setselectedskill } from "../../features/skill/skillSlice";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../hooks/useAuth";
import { useSendFriendRequestMutation } from "../../features/user/userApiSlice";

const Skills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useAuth();
  const { data: skills, isLoading } = useGetSkillQuery();

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState([0, 70000]);
  const [sortOption, setSortOption] = useState("default");
  const [dateSort, setDateSort] = useState("newest");

  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);

  useEffect(() => {
    if (skills) {
      const filteredSkills = skills.filter((skill) => {
        const listedBy = skill.SkillListedByGeneralUsers?.[0]?.general_user_id;
        return listedBy !== user_id;
      });
      dispatch(setskills({ skill: filteredSkills }));
    }
  }, [skills, dispatch, user_id]);

  const handleCategoryClick = (category) => setActiveCategory(category);
  const handlePriceChange = (event) =>
    setPriceRange([0, Number(event.target.value)]);
  const handleSortChange = (option) => setSortOption(option);
  const handleDateSortChange = (option) => setDateSort(option);

  // Filtering & Sorting
  const filteredAndSortedSkills = useSelector((state) => state.skill.skill)
    ?.filter((skill) => {
      const categoryMatch =
        activeCategory === "All Products" ||
        skill.Category?.category_name === activeCategory;
      const priceMatch =
        skill.skill_amount >= priceRange[0] &&
        skill.skill_amount <= priceRange[1];
      return categoryMatch && priceMatch;
    })
    ?.sort((a, b) => {
      if (sortOption === "price-low-high")
        return a.skill_amount - b.skill_amount;
      if (sortOption === "price-high-low")
        return b.skill_amount - a.skill_amount;
      if (dateSort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (dateSort === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  if (isLoading)
    return (
      <div className="container mx-auto mt-8 mb-8 py-4 px-9">Loading...</div>
    );

  return (
    <div className="w-full">
      <div className="container mx-auto mt-10 ml-4 mr-4 py-4 px-6 w-full max-w-screen-2xl">
        <h2 className="text-3xl font-semibold mb-6">Skills</h2>
        <div className="flex items-center gap-6 mb-6 pb-2">
          {["All Products", "Education", "Gaming", "Music", "Accessories"].map(
            (category) => (
              <span
                key={category}
                className={`cursor-pointer ${
                  activeCategory === category
                    ? "font-semibold border-b-2 border-orange-500 pb-1"
                    : "text-gray-500"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </span>
            )
          )}
          <Link
            to="/Skills"
            className="text-orange-500 font-medium ml-auto cursor-pointer"
          >
            Browse All Products →
          </Link>
        </div>
      </div>

      <div className="flex w-full h-[800px] " data-aos="zoom-in">
        {/* Product List */}
        <div className="bg-gray-100 flex flex-wrap gap-5 flex-grow rounded-lg p-5 mx-10 mb-10">
          {filteredAndSortedSkills.length > 0 ? (
            filteredAndSortedSkills.map((product) => (
              <div
                key={product.skill_id}
                className="border-none p-2.5 rounded-lg shadow-sm w-[330px] h-[350px] bg-white"
                onClick={() => {
                  dispatch(setselectedskill({ selectedskill: product }));
                  navigate("/product");
                }}
              >
                <Link to="/Product">
                  <img
                    src={product.Skill_imgs?.[0]?.img_url || "/placeholder.svg"}
                    alt={product.skill_name}
                    className="w-full h-[220px] rounded-md transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
                <h4 className="text-lg font-bold my-2.5">
                  {product.skill_name}
                </h4>
                <p className="text-sm mb-2.5 text-gray-600">
                  {product.skill_description
                    ? product.skill_description.length > 20
                      ? product.skill_description.substring(0, 20) + "..."
                      : product.skill_description
                    : "No description"}
                </p>
                <p className="flex text-lg font-bold text-blue-500">
                  <FaRupeeSign className="size-5 flex translate-y-1" />
                  {product.skill_amount}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
