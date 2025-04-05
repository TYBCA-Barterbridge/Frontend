import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetGoodQuery } from "../../features/good/goodApiSlice";
import { FaRupeeSign } from "react-icons/fa";
import { setgoods, setselectedgood } from "../../features/good/goodSlice";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../hooks/useAuth";

const Goods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useAuth();
  const { data: goods, isLoading } = useGetGoodQuery();

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState([0, 70000]);
  const [sortOption, setSortOption] = useState("default");
  const [dateSort, setDateSort] = useState("newest");

  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);

  useEffect(() => {
    if (goods) {
      const filteredGoods = goods.filter((good) => {
        const listedBy = good.GoodListedByGeneralUsers?.[0]?.general_user_id;
        return listedBy !== user_id;
      });
      dispatch(setgoods({ good: filteredGoods }));
    }
  }, [goods, dispatch, user_id]);

  const handleCategoryClick = (category) => setActiveCategory(category);
  const handlePriceChange = (event) =>
    setPriceRange([0, Number(event.target.value)]);
  const handleSortChange = (option) => setSortOption(option);
  const handleDateSortChange = (option) => setDateSort(option);

  // Filtering & Sorting
  const filteredAndSortedGoods = useSelector((state) => state.good.good)
    ?.filter((good) => {
      const categoryMatch =
        activeCategory === "All Products" ||
        good.Category?.category_name === activeCategory;
      const priceMatch =
        good.good_amount >= priceRange[0] && good.good_amount <= priceRange[1];
      return categoryMatch && priceMatch;
    })
    ?.sort((a, b) => {
      if (sortOption === "price-low-high") return a.good_amount - b.good_amount;
      if (sortOption === "price-high-low") return b.good_amount - a.good_amount;
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
        <h2 className="text-3xl font-semibold mb-6">Goods</h2>
        <div className="flex items-center gap-6 mb-6 pb-2">
          {[
            "All Products",
            "Technology",
            "Computers",
            "Music",
            "Accessories",
          ].map((category) => (
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
          ))}
          <Link
            to="/Goods"
            className="text-orange-500 font-medium ml-auto cursor-pointer"
          >
            Browse All Products →
          </Link>
        </div>
      </div>

      <div className="flex w-full" data-aos="zoom-in">
        {/* Sidebar Filters */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm w-[250px] ml-10 mb-10 flex-shrink-0 mr-5 h-[1000px]">
          {/* Price Range Filter */}
          <h3 className="mb-4 text-lg text-gray-800">Price Range</h3>
          <input
            type="range"
            min="0"
            max="70000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full mt-2.5"
          />
          <div className="flex justify-between items-center mt-2.5">
            <input
              type="number"
              value={priceRange[0]}
              readOnly
              className="w-[45%] p-1.5 text-sm text-center border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value) || 0])}
              className="w-[45%] p-1.5 text-sm text-center border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>

          <hr className="my-4" />

          {/* Price Sorting */}
          <h3 className="mb-4 text-lg text-gray-800">Sort by Price</h3>
          <label className="flex items-center text-sm cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={sortOption === "price-low-high"}
              onChange={() => handleSortChange("price-low-high")}
              className="mr-2.5 accent-blue-600"
            />
            Low to High
          </label>
          <label className="flex items-center text-sm cursor-pointer mt-2">
            <input
              type="radio"
              name="price"
              checked={sortOption === "price-high-low"}
              onChange={() => handleSortChange("price-high-low")}
              className="mr-2.5 accent-blue-600"
            />
            High to Low
          </label>

          <hr className="my-4" />

          {/* Date Sorting */}
          <h3 className="mb-4 text-lg text-gray-800">Sort by Date</h3>
          <label className="flex items-center text-sm cursor-pointer">
            <input
              type="radio"
              name="date"
              checked={dateSort === "newest"}
              onChange={() => handleDateSortChange("newest")}
              className="mr-2.5 accent-blue-600"
            />
            Newest First
          </label>
          <label className="flex items-center text-sm cursor-pointer mt-2">
            <input
              type="radio"
              name="date"
              checked={dateSort === "oldest"}
              onChange={() => handleDateSortChange("oldest")}
              className="mr-2.5 accent-blue-600"
            />
            Oldest First
          </label>
          <div className="flex justify-center items-center">
            <img
              className="w-350 h-[500px] my-15 rounded-2xl"
              src="./images/banner1.png"
              alt=""
            />
          </div>
        </div>

        {/* Product List */}
        <div className="bg-gray-50 flex flex-wrap gap-5 flex-grow rounded-lg p-5 mr-10 mb-10">
          {filteredAndSortedGoods.length > 0 ? (
            filteredAndSortedGoods.map((product) => (
              <div
                key={product.good_id}
                className="border-none p-2.5 rounded-lg shadow-sm w-[330px] h-[350px] bg-white"
                onClick={() => {
                  dispatch(setselectedgood({ selectedgood: product }));
                  navigate("/product");
                }}
              >
                <Link to="/Product">
                  <img
                    src={product.Good_imgs?.[0]?.img_url || "/placeholder.svg"}
                    alt={product.good_name}
                    className="w-full h-[220px] rounded-md transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
                <h4 className="text-lg font-bold my-2.5">
                  {product.good_name}
                </h4>
                <p className="text-sm mb-2.5 text-gray-600">
                  {product.good_description
                    ? product.good_description.length > 20
                      ? product.good_description.substring(0, 20) + "..."
                      : product.good_description
                    : "No description"}
                </p>
                <p className="flex text-lg font-bold text-blue-500">
                  <FaRupeeSign className="size-5 flex translate-y-1" />
                  {product.good_amount}
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

export default Goods;
