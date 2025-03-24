import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetGoodQuery } from "../../features/good/goodApiSlice";
import { FaRupeeSign } from "react-icons/fa";
import { setgoods, setselectedgood } from "../../features/good/goodSlice";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const ProductCard = () => {
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const dispatch = useDispatch();
  const { data: goods, isLoading } = useGetGoodQuery();
  const products = useSelector(state => state.good.good);

  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);

  useEffect(() => {
    if (goods) {
      dispatch(setgoods({ good: goods }));
    }
  }, [goods, dispatch]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (!goods) return;

    if (category === "All Products") {
      dispatch(setgoods({ good: goods }));
    } else {
      const filteredGoods = goods.filter(good => 
        good.Category && good.Category.category_name === category
      );
      dispatch(setgoods({ good: filteredGoods }));
    }
  };

  const handlePriceChange = (event) => {
    const value = Number.parseInt(event.target.value, 10);
    setPriceRange([priceRange[0], value]);
  };

  if (isLoading) {
    return <div className="container mx-auto mt-8 mb-8 py-4 px-9">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="container mx-auto mt-10 ml-4 mr-4 py-4 px-6 w-full max-w-screen-2xl">
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <div className="flex items-center gap-6 mb-6 border-b pb-2">
          <span 
            className={`cursor-pointer ${activeCategory === "All Products" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
            onClick={() => handleCategoryClick("All Products")}
          >
            All Products
          </span>
          <span 
            className={`cursor-pointer ${activeCategory === "Technology" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
            onClick={() => handleCategoryClick("Technology")}
          >
            Technology
          </span>
          <span 
            className={`cursor-pointer ${activeCategory === "Computers" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
            onClick={() => handleCategoryClick("Computers")}
          >
            Computers
          </span>
          <span 
            className={`cursor-pointer ${activeCategory === "Music" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
            onClick={() => handleCategoryClick("Music")}
          >
            Music
          </span>
          <span 
            className={`cursor-pointer ${activeCategory === "Accessories" ? "font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"}`}
            onClick={() => handleCategoryClick("Accessories")}
          >
            Accessories
          </span>
          <Link to="/Goods" className="text-orange-500 font-medium ml-auto cursor-pointer">
            Browse All Products →
          </Link>
        </div>
      </div>
      <div className="flex w-full" data-aos="zoom-in">
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm w-[250px] ml-10 mb-10 flex-shrink-0 mr-5 h-[940px]">
          <div className="mt-2.5">
            <h3 className="mb-4 text-lg text-gray-800">Categories</h3>
          </div>
          <hr className="my-4" />
          <div>
            <div className="mt-5 mb-7">
              <h3 className="mb-4 text-lg text-gray-800">Price Range</h3>
              <input
                type="range"
                min="0"
                max="1000"
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
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Number.parseInt(e.target.value, 10),
                    ])
                  }
                  className="w-[45%] p-1.5 text-sm text-center border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <ul className="list-none p-0 mt-5 mb-5">
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="radio" name="price" className="mr-2.5" />
                  Price: Low to High
                </label>
              </li>
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="radio" name="price" className="mr-2.5" />
                  Price: High to Low
                </label>
              </li>
            </ul>
          </div>
          <hr className="my-4" />
          <div className="mt-2.5">
            <h3 className="mb-4 text-lg text-gray-800">Date Added</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="radio" name="date" className="mr-2.5" />
                  Newest First
                </label>
              </li>
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="radio" name="date" className="mr-2.5" />
                  Oldest First
                </label>
              </li>
            </ul>
          </div>
          <hr className="my-4" />
          <div className="flex justify-center items-center">
            <img
              className="w-350 h-[400px] mt-5 rounded-2xl"
              src="./images/banner1.png"
              alt=""
            />
          </div>
        </div>
        <div className="bg-gray-50 flex flex-wrap gap-5 flex-grow rounded-lg p-5 mr-10 mb-10">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.good_id}
                className="border-none p-2.5 rounded-lg shadow-sm w-[330px] h-[350px] bg-white"
              >
                <Link 
                  to="/Product"
                  onClick={() => dispatch(setselectedgood({ selectedgood: product }))}
                >
                  <img
                    src={product.Good_imgs?.[0]?.img_url || "/placeholder.svg"}
                    alt={product.good_name}
                    className="w-full h-[220px] rounded-md transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
                <h4 className="text-lg font-bold mb-2.5">{product.good_name}</h4>
                <p className="text-sm mb-2.5 text-gray-600">
                  {product.good_description}
                </p>
                <p className="flex text-lg font-bold text-blue-500">
                  <FaRupeeSign className="size-5 flex translate-y-1"/>{product.good_amount}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No products found in this category</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
