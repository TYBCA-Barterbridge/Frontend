import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const products = [
    { name: "Product 1", image: "/images/z9001.png", link: "/product/1" },
    { name: "Product 2", image: "/images/z9001.png", link: "/product/2" },
    { name: "Product 3", image: "/images/z9001.png", link: "/product/3" },
    { name: "Product 4", image: "/images/z9001.png", link: "/product/4" },
    { name: "Product 5", image: "/images/z9001.png", link: "/product/5" },
    { name: "Product 6", image: "/images/z9001.png", link: "/product/6" },
    { name: "Product 7", image: "/images/z9001.png", link: "/product/7" },
    { name: "Product 8", image: "/images/z9001.png", link: "/product/8" },
  ];

  const handleNext = () => {
    if (startIndex + 4 < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative flex items-center justify-between p-5 bg-gray-100 shadow-md mb-10 m-2">
      {/* Left Button */}
      <button
        className="absolute left-0 z-10 bg-[#18abd7] text-white rounded-full p-3 text-lg shadow-md transition-transform hover:scale-110 disabled:bg-gray-400"
        onClick={handlePrev}
        disabled={startIndex === 0}
      >
        &#8592;
      </button>

      {/* Product List */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-500"
          style={{ transform: `translateX(-${startIndex * 25}%)` }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-none w-1/4 text-center bg-white rounded-lg p-4 shadow-md transform transition-transform hover:scale-110"
            >
              <Link to={product.link}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover rounded-lg"
                />
                <p className="mt-2 text-lg font-bold text-gray-800">{product.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 z-10 bg-[#18abd7] text-white rounded-full p-3 text-lg shadow-md transition-transform hover:scale-110 disabled:bg-gray-400"
        onClick={handleNext}
        disabled={startIndex + 4 >= products.length}
      >
        &#8594;
      </button>
    </div>
  );
};

export default ProductCarousel;
