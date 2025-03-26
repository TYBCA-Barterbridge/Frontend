import { useState } from "react";
import { useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BuyPage from "../../components/BuyPage/BuyPage";

const Product = () => {
  const navigate = useNavigate();
  const product = useSelector((state) => state.good.selectedgood);
  const skill = useSelector((state) => state.skill.selectedskill);
  const [showBuyForm, setShowBuyForm] = useState(false);

  if (!product && !skill) {
    return <div className="p-5">No product or skill selected</div>;
  }

  const images = product
    ? product.Good_imgs
    : skill
    ? skill.Skill_imgs
    : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  if (showBuyForm) {
    return <BuyPage />;
  }

  return (
    <>
      <div className="h-10 bg-sky-600 -mt-10"></div>
      <div className="flex flex-col md:flex-row p-5 gap-5 font-sans mt-5 mb-10">
        {/* Left: Images Section */}
        <div className="bg-gray-300/20 flex-1 shadow-lg pt-10 flex flex-col justify-center items-center gap-2.5 max-w-3xl">
          <div className="w-full flex items-center justify-center">
            <img
              src={
                images[selectedImageIndex]?.img_url
                  ? `/${images[selectedImageIndex].img_url.split('/').pop()}`
                  : "/placeholder.svg"
              }
              alt={`Image ${selectedImageIndex + 1}`}
              className="bg-white max-w-full max-h-[400px] rounded-lg border border-gray-200 shadow-md p-10 md:p-[60px] object-cover"
            />
          </div>
          <div className="flex items-center gap-3 max-w-3xl">
            <button
              className={`bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors ${
                selectedImageIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sky-500 hover:text-white"
              }`}
              onClick={handlePrevImage}
              disabled={selectedImageIndex === 0}
            >
              &#8592;
            </button>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.img_url ? `/${image.img_url.split('/').pop()}` : "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[120px] h-[90px] object-cover border ${
                  index === selectedImageIndex
                    ? "border-2 border-sky-500"
                    : "border-gray-200"
                } rounded p-2.5 bg-white shadow-md cursor-pointer transition-transform hover:scale-110`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
            <button
              className={`bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors ${
                selectedImageIndex === images.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sky-500 hover:text-white"
              }`}
              onClick={handleNextImage}
              disabled={selectedImageIndex === images.length - 1}
            >
              &#8594;
            </button>
          </div>
          <div className="flex justify-center items-center mt-10 mb-10">
            <button className="mt-7 w-[300px] bg-orange-500 text-white border-none py-3 px-5 text-base font-bold cursor-pointer transition-all hover:bg-sky-600 active:bg-sky-700 active:scale-100">
              Chat with Seller
            </button>
          </div>
        </div>

        {/* Right: Details Section */}
        <div className="flex-1 pt-20 flex flex-col gap-4">
          <h2 className="text-5xl font-medium">
            {product?.good_name || skill?.skill_name}
          </h2>
          <div className="flex-col text-lg">
            <p className="text-lg font-normal">
              Listed by:{" "}
              {product?.GoodListedByGeneralUsers?.[0]?.GeneralUser?.User?.fname ||
                skill?.SkillListedByGeneralUsers?.[0]?.GeneralUser?.User?.fname}
            </p>
           {
            !skill?.skill_name ? (
              <p
              className={`text-lg font-normal ${
                product?.status === "Available" || ""
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Status: {product?.status || ""}
            </p>
            ):(
              null
            )
           }
            <p>Category: {product?.Category?.category_name || skill?.Category?.category_name}</p>
          </div>
          <div className="flex items-center gap-2.5 text-xl">
            <span className="text-2xl font-bold text-green-600 flex">
              <FaRupeeSign className="translate-y-1 size-7" />
              {product?.good_amount || skill?.skill_amount}
            </span>
          </div>
          <hr className="my-5" />
          <div className="flex gap-2.5">
          <button 
              onClick={() => setShowBuyForm(true)}
              className="flex-1 py-2.5 px-2.5 text-base border-none rounded cursor-pointer transition-colors bg-orange-500 text-white hover:bg-sky-600"
            >
              BUY NOW
            </button>
            <button className="flex-1 py-2.5 px-2.5 text-sm border-none bg-gray-100 rounded cursor-pointer transition-colors hover:bg-gray-200">
              Exchange
            </button>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-500 border border-gray-200 p-5">
            <span>100% Guarantee Safe Checkout</span>
            <img
              src="https://clicon-html.netlify.app/image/payment-method.png"
              alt="Payment Options"
              className="h-[25px]"
            />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mx-5 my-5 border border-gray-200">
        <div className="flex gap-2.5 p-2.5 border-b border-gray-200 justify-center">
          <div className="p-2.5 text-black border-b-2 border-sky-500">
            Description
          </div>
        </div>
        <div className="grid">
          <div className="p-5 bg-gray-50 rounded mt-2.5">
            <h2 className="text-lg font-bold">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {product?.good_description || skill?.skill_description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;