import React from "react";

function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }}>
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h2>

        <form className="flex flex-col">
          <label className="text-left text-gray-700 font-medium">Full Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#18abd7] mt-1 mb-3" placeholder="Enter your full name" required />

          <label className="text-left text-gray-700 font-medium">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#18abd7] mt-1 mb-3" placeholder="Enter your email" required />

          <label className="text-left text-gray-700 font-medium">Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#18abd7] mt-1 mb-3" placeholder="Enter your password" required />

          <label className="text-left text-gray-700 font-medium">Confirm Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#18abd7] mt-1 mb-4" placeholder="Confirm your password" required />

          <button type="submit" className="w-full py-2 bg-[#18abd7] text-white rounded-md font-semibold text-lg hover:bg-[#1288a6] transition duration-300">
            Sign Up
          </button>
        </form>

        <div className="mt-4">
          <p className="text-gray-600">
            Already have an account? <a href="../SignIn" className="text-[#18abd7] hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
