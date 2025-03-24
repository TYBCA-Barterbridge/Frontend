import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const products = [
    { name: "Product 1", image: "/images/5.jpg", link: "/product/1" },
    { name: "Product 2", image: "/images/z9002.jpg", link: "/product/2" },
    { name: "Product 3", image: "/images/z9003.jpg", link: "/product/3" },
    { name: "Product 4", image: "/images/1.jpg", link: "/product/4" },
    { name: "Product 5", image: "/images/4.jpg", link: "/product/5" },
    { name: "Product 6", image: "/images/2.jpg", link: "/product/6" },
    { name: "Product 7", image: "/images/6.jpg", link: "/product/7" }
  ];

  const totalProducts = products.length;
  const visibleProducts = 7;

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % totalProducts);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + totalProducts) % totalProducts);
  };

  return (
    <div className="relative flex items-center justify-between p-5 bg-gray-100 shadow-md mb-10 m-2">
      {/* Left Button */}
      <button
        className="absolute m-[-20px] left-0 z-10 bg-[#18abd7] text-white w-13 rounded-full p-3 text-lg shadow-md transition-transform hover:scale-110"
        onClick={handlePrev}
      >
        &#8592;
      </button>

      {/* Product List */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-500"
          style={{ transform: `translateX(-${(startIndex % totalProducts) * (100 / visibleProducts)}%)` }}
        >
          {products.concat(products).slice(startIndex, startIndex + visibleProducts).map((product, index) => (
            <div
              key={index}
              className="flex-none w-1/4 text-center bg-white rounded-lg p-4 shadow-md transform transition-transform hover:scale-110"
            >
              <Link to={product.link}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-55 object-cover rounded-lg"
                />
                <p className="mt-2 text-lg font-bold text-gray-800">{product.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <button
        className="absolute m-[-20px] right-0 z-10 bg-[#18abd7] text-white w-13 rounded-full p-3 text-lg shadow-md transition-transform hover:scale-110"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default ProductCarousel;
