import { ArrowLeft, Star, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function OrderHistoryDetails() {
  const [currentStep, setCurrentStep] = useState(2); // 1: Requested, 2: Negotiation, 3: Accepted

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button className="mr-2 -mt-4">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <Link to="/OrderHistory" className="text-2xl font-bold mb-4 text-gray-800 hover:underline">ORDER DETAILS</Link>
        </div>
        <button className="text-orange-500 flex items-center">
          Leave a Rating
          <span className="ml-1 text-xl">+</span>
        </button>
      </div>

      {/* Order Info Card */}
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">#96459761</h2>
        <p className="text-gray-600">
          Order Type: Exchange • Order Placed on Dec 30, 2024 07:52
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="mb-10">
        <div className="relative flex items-center justify-between mb-6">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>

          {/* First segment of progress bar (completed) */}
          <div className="absolute left-0 right-1/2 top-1/2 h-1 bg-orange-400 -z-5"></div>

          {/* Second segment of progress bar (in progress) */}
          {currentStep >= 2 && (
            <div className="absolute left-1/2 right-1/4 top-1/2 h-1 bg-orange-300 -z-5"></div>
          )}

          {/* Step 1 - Completed */}
          <div className="z-10 bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Step 2 - Current */}
          <div
            className={`z-10 ${
              currentStep >= 2 ? "bg-orange-400" : "bg-gray-200"
            } rounded-full w-8 h-8 flex items-center justify-center`}
          ></div>

          {/* Step 3 - Pending */}
          <div
            className={`z-10 ${
              currentStep >= 3 ? "bg-orange-400" : "bg-gray-200"
            } rounded-full w-8 h-8 flex items-center justify-center`}
          ></div>
        </div>

        <div className="flex justify-between text-center">
          <div className="w-1/3">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="font-medium">Exchange Requested</p>
          </div>
          <div className="w-1/3">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
              </div>
            </div>
            <p className="font-medium">Negotiation</p>
          </div>
          <div className="w-1/3">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-400">Accepted</p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-medium mb-6">Product Details</h2>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <img
              src="/images/2.jpg"
              alt="Samsung Galaxy S21 5G"
              className="mx-auto mb-4 w-40 h-40 rounded-lg border"
            />
            <p className="text-sm">Samsung Electronics Samsung</p>
            <p className="text-sm font-medium">Galaxy S21 5G</p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-orange-400 flex items-center justify-center">
              <img
                src="/images/arrow-left-right.png"
                className="h-10 w-10 text-orange-500"
              ></img>
            </div>
          </div>

          <div className="text-center">
            <img
              src="/images/4.jpg"
              alt="Samsung Galaxy S21 5G"
              className="mx-auto mb-4 w-40 h-40 rounded-lg border"
            />
            <p className="text-sm">Samsung Electronics Samsung</p>
            <p className="text-sm font-medium">Galaxy S21 5G</p>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-medium mb-6">Seller Info</h2>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img
                src="/images/1.jpg"
                alt="Seller Avatar"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">Murli Vijay</p>
                <p className="text-sm text-gray-600">Candolim-Bardez, Goa</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Email:</span> murvij@gmail.com
              </p>
              <p>
                <span className="text-gray-600">Sec Email:</span> mvj@gmail.com
              </p>
              <p>
                <span className="text-gray-600">Phone:</span> +91 11111 22222
              </p>
            </div>

            <button className="mt-4 border border-orange-400 text-orange-500 px-6 py-2 rounded-md">
              Chat
            </button>
          </div>

          <div className="md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Ratings</h3>
              <a href="#" className="text-blue-500 flex items-center text-sm">
                View reviews <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <div className="w-8 flex items-center">
                    <span>{rating}</span>
                    <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-gray-200 h-2 rounded-full w-full">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width:
                            rating === 5
                              ? "75%"
                              : rating === 4 || rating === 3
                              ? "15%"
                              : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-6 text-right">
                    {rating === 5 ? 10 : rating === 4 || rating === 3 ? 1 : 0}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="mt-4 text-blue-500 flex items-center text-sm justify-end"
            >
              Leave a rating <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
