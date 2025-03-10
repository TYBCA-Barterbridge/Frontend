import React from "react";

const SignIn = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h1>

        {/* Google Sign-In Button */}
        <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition duration-300">
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Continue with Google
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="mx-3 text-gray-600 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* Sign In Form */}
        <form className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#18abd7] mt-1 mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#18abd7] mt-1 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#18abd7] text-white rounded-md font-semibold text-lg hover:bg-[#1288a6] transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <a href="/ForgotPass" className="text-[#18abd7] hover:underline">
            Forgot Password?
          </a>
          <a href="/SignUp" className="text-[#18abd7] hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
