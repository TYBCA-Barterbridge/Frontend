import React from "react";

const ForgotPass = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)" }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forgot Password</h2>
        <p className="text-gray-600 mb-4">Enter your email address to verify.</p>

        <form className="flex flex-col space-y-4">
          <label className="text-gray-700 font-medium text-left">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />

          <a href="./Verification">
            <button
              type="button"
              className="w-full py-2 bg-[#18abd7] text-white rounded-lg hover:bg-[#1288a6] transition"
            >
              Send
            </button>
          </a>
        </form>

        <div className="mt-4">
          <a href="./SignIn" className="text-[#18abd7] hover:underline">
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
