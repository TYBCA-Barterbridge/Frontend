import { useState } from "react";
import PropTypes from "prop-types";

const categories = [
  { value: "electronics", label: "Electronics Devices" },
  { value: "computers", label: "Computers & Laptops" },
  { value: "accessories", label: "Accessories" },
  { value: "smartphones", label: "Smartphones" },
];

const ProductCard = ({ totalSteps = 7 }) => {
  const [priceRange, setPriceRange] = useState([100, 1000]);

  const handlePriceChange = (event) => {
    const value = Number.parseInt(event.target.value, 10);
    setPriceRange([priceRange[0], value]);
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const products = [
    {
      id: 1,
      name: "Smartphone XYZ",
      description: "Latest smartphone with advanced features.",
      price: "699",
      detailUrl: "./ProductDetail",
      img: "./images/z900.jpg",
    },
    {
      id: 2,
      name: "Laptop ABC",
      description: "High-performance laptop for professionals.",
      price: "999",
      img: "./images/z9002.jpg",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "199",
      img: "./images/z9003.jpg",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "199",
      img: "https://i.pinimg.com/474x/21/7b/be/217bbe8121fe653ec9ab50eaec4d2f5a.jpg",
    },
    {
      id: 5,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "199",
      img: "https://i.pinimg.com/474x/8c/86/bc/8c86bc973584beebc03fa421270d9062.jpg",
    },
    {
      id: 6,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "199",
      img: "https://i.pinimg.com/474x/95/72/6d/95726dbf71539de4c65b61cdfed5e7c7.jpg",
    },
    {
      id: 7,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "199",
      img: "https://i.pinimg.com/474x/bb/f3/55/bbf3558cd63361de2714ae7049d24da9.jpg",
    },
    {
      id: 8,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "199",
      img: "https://i.pinimg.com/474x/ae/43/7c/ae437ce161489caee7014d3afba3d418.jpg",
    },
    {
      id: 9,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "199",
      img: "https://i.pinimg.com/474x/49/72/88/49728884275ec9d7ef90329a055fb38c.jpg",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex w-full">
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm w-[250px] ml-10 mb-10 flex-shrink-0 mr-5 h-[800px]">
          <div className="mt-2.5">
            <h3 className="mb-4 text-lg text-gray-800">Categories</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="electronics"
                    className="mr-2.5"
                  />
                  Electronics Devices
                </label>
              </li>
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="computers"
                    className="mr-2.5"
                  />
                  Computers & Laptops
                </label>
              </li>
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="accessories"
                    className="mr-2.5"
                  />
                  Accessories
                </label>
              </li>
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="smartphones"
                    className="mr-2.5"
                  />
                  Smartphones
                </label>
              </li>
            </ul>
          </div>
          <div className="mt-2.5">
            <h3 className="mb-4 text-lg text-gray-800">Learn Skills</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="skill"
                    value="electronics"
                    className="mr-2.5"
                  />
                  Learn New Skills
                </label>
              </li>
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="skill"
                    value="electronics"
                    className="mr-2.5"
                  />
                  Attend Workshops
                </label>
              </li>
            </ul>
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

          <div className="mt-2.5">
            <h3 className="mb-4 text-lg text-gray-800">Offers</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="radio" name="offer" className="mr-2.5" />
                  Buy more, Save more
                </label>
              </li>
              <li className="mb-2.5">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="radio" name="offer" className="mr-2.5" />
                  Special Price
                </label>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              className="w-300 h-[400px] mt-5"
              src="./images/banner1.png"
              alt=""
            />
          </div>
        </div>
        <div className="bg-gray-50 flex flex-wrap gap-5 flex-grow rounded-lg p-5 mr-10 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="border-none p-2.5 rounded-lg shadow-sm w-[330px] h-[350px] bg-white"
            >
              <a href="./ProductDetails">
                <img
                  src={product.img || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-[220px] rounded-md transition-transform duration-300 hover:scale-[1.03]"
                />
              </a>
              <h4 className="text-lg font-bold mb-2.5">{product.name}</h4>
              <p className="text-sm mb-2.5 text-gray-600">
                {product.description}
              </p>
              <p className="text-base font-bold text-blue-500">
                {product.price}
              </p>
            </div>
          ))}
          <div className="flex justify-center w-full">
            <div className="flex items-center justify-center gap-4 m-5">
              <button
                className={`bg-transparent border-2 border-[#f7931e] rounded-full text-[#f7931e] w-10 h-10 flex items-center justify-center cursor-pointer text-xl transition-all duration-300 ${
                  currentStep === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#f7931e] hover:text-white"
                }`}
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                &#8592;
              </button>

              {Array.from({ length: totalSteps }, (_, index) => {
                const step = index + 1;
                return (
                  <button
                    key={step}
                    className={`bg-transparent border-2 ${
                      step === currentStep
                        ? "bg-[#f7931e] text-white border-[#f7931e]"
                        : "border-gray-300 text-black hover:border-[#f7931e] hover:text-[#f7931e]"
                    } rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-base transition-all duration-300`}
                    onClick={() => setCurrentStep(step)}
                  >
                    {`0${step}`.slice(-2)}
                  </button>
                );
              })}

              <button
                className={`bg-transparent border-2 border-[#f7931e] rounded-full text-[#f7931e] w-10 h-10 flex items-center justify-center cursor-pointer text-xl transition-all duration-300 ${
                  currentStep === totalSteps
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#f7931e] hover:text-white"
                }`}
                onClick={handleNext}
                disabled={currentStep === totalSteps}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  totalSteps: PropTypes.number,
};

export default ProductCard;
