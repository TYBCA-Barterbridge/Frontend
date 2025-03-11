"use client"

import { useState } from "react"

const ProductDetails = ({ product }) => {
  product = {
    title: "2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
    rating: "4.5 Star rating",
    reviews: 320,
    currentPrice: 699,
    originalPrice: 799,
    discount: 13,
    images: [
      "https://clicon-html.netlify.app/image/product/mac.png",
      "./images/z900.jpg",
      "./images/z9001.png",
      "./images/z9002.jpg",
      "./images/z9003.jpg",
    ],
    memoryOptions: ["64 GB", "128 GB", "256 GB"],
    sizeOptions: ["13 inch", "14 inch", "16 inch"],
    storageOptions: ["256 GB", "512 GB", "1 TB"],
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const handleNextImage = () => {
    if (selectedImageIndex < product.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const handleQuantityChange = (change) => {
    if (quantity + change > 0) {
      setQuantity(quantity + change)
    }
  }

  const [activeTab, setActiveTab] = useState("Description")
  const tabData = {
    Description: `
      The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.
      
      Even the most ambitious projects are easily handled with up to 10
      CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and
      dedicated encode and decode media engines that support H.264, HEVC,
      and ProRes codecs.
      The most powerful MacBook Pro ever is here. With the blazing-fast M1
      Pro or M1 Max chip — the first Apple silicon designed for pros — you
      get groundbreaking performance and amazing battery life. Add to that
      a stunning Liquid Retina XDR display, the best camera and audio ever
      in a Mac notebook, and all the ports you need. The first notebook of
      its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional
      performance of the M1 architecture to a whole new level for pro users.
      
      Even the most ambitious projects are easily handled with up to 10
      CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and
      dedicated encode and decode media engines that support H.264, HEVC,
      and ProRes codecs.
    `,
    "Additional Information": `
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
      Dimensions: 35.57 x 24.81 x 1.62 cm
      Weight: 2.1 kg
      Operating System: macOS Monterey
      Battery Life: Up to 21 hours
      Warranty: 1 year
    `,
    Specification: `
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
      Processor: M1 Pro Chip (10-core CPU, 16-core GPU)
      Memory: 16GB unified memory
      Storage: 1TB SSD
      Display: 16.2-inch Liquid Retina XDR display
      Ports: 3 Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3
    `,
  }

  return (
    <>
      <div className="h-10 bg-sky-600 -mt-10"></div>
      <div className="flex flex-col md:flex-row p-5 gap-5 font-sans mt-5 mb-10">
        {/* Left: Product Images */}
        <div className="flex-1 flex flex-col items-center gap-2.5 max-w-3xl">
          <div className="w-full text-center">
            <img
              src={product.images[selectedImageIndex] || "/placeholder.svg"}
              alt={`Product Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[400px] rounded-lg border border-gray-200 shadow-md p-10 md:p-[60px] object-cover"
            />
          </div>
          <div className="flex items-center gap-2.5 max-w-3xl">
            <button
              className={`bg-gray-100 border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors ${
                selectedImageIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-500 hover:text-white"
              }`}
              onClick={handlePrevImage}
              disabled={selectedImageIndex === 0}
            >
              &#8592;
            </button>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[120px] h-[90px] object-cover border ${
                  index === selectedImageIndex ? "border-2 border-sky-500" : "border-gray-200"
                } rounded p-2.5 shadow-md cursor-pointer transition-transform hover:scale-110`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
            <button
              className={`bg-gray-100 border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors ${
                selectedImageIndex === product.images.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sky-500 hover:text-white"
              }`}
              onClick={handleNextImage}
              disabled={selectedImageIndex === product.images.length - 1}
            >
              &#8594;
            </button>
          </div>
          <div className="flex justify-center items-center mt-10 mb-10">
            <button className="mt-7 w-[300px] bg-sky-500 text-white border-none py-3 px-5 text-base font-bold cursor-pointer transition-all hover:bg-sky-600 active:bg-sky-700 active:scale-100">
              Chat with Seller
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-base text-gray-600 font-light">
            ⭐ {product.rating} ({product.reviews} User feedback)
          </div>
          <h2 className="text-3xl font-extralight">{product.title}</h2>
          <div>
            <p>Availability: In Stock</p>
            <p>Category: {product.category}</p>
          </div>
          <div className="flex items-center gap-2.5 text-xl">
            <span className="text-2xl font-bold text-green-600">{product.currentPrice}</span>
          </div>
          <hr className="my-5" />
          <div className="flex flex-row gap-2.5">
            <div className="gap-2.5 text-base">
              <p>Memory:</p>
              <select className="py-1.5 px-2.5 text-base border border-gray-200 rounded cursor-pointer w-40">
                {product.memoryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="gap-2.5 text-base ml-4">
              <p>Size:</p>
              <select className="py-1.5 px-2.5 text-base border border-gray-200 rounded cursor-pointer w-40">
                {product.sizeOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2.5 border border-gray-200 w-[100px] p-1">
            <button
              className="w-[30px] h-[30px] text-xl bg-gray-100 border-none rounded-full cursor-pointer transition-colors hover:bg-sky-500 hover:text-white"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="text-xl font-bold">{quantity}</span>
            <button
              className="w-[30px] h-[30px] text-xl bg-gray-100 border-none rounded-full cursor-pointer transition-colors hover:bg-sky-500 hover:text-white"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <div className="flex gap-2.5">
            <button className="flex-1 py-2.5 px-2.5 text-base border-none rounded cursor-pointer transition-colors bg-amber-400 text-black hover:bg-amber-500">
              ADD TO CART
            </button>
            <button className="flex-1 py-2.5 px-2.5 text-base border-none rounded cursor-pointer transition-colors bg-sky-500 text-white hover:bg-sky-600">
              BUY NOW
            </button>
          </div>
          <div className="flex gap-2.5">
            <button className="flex-1 py-2.5 px-2.5 text-sm border-none bg-gray-100 rounded cursor-pointer transition-colors hover:bg-gray-200">
              ♡ Add to Wishlist
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
          {["Description", "Additional Information", "Specification"].map((tab) => (
            <div
              key={tab}
              className={`p-2.5 cursor-pointer transition-colors ${
                activeTab === tab ? "text-sky-500 border-b-2 border-sky-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="grid">
          <div className="p-5 bg-gray-50 rounded mt-2.5">
            <h2 className="text-lg font-bold">{activeTab}</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{tabData[activeTab]}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails

