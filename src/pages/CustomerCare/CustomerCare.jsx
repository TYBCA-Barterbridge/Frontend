import React from 'react';

function CustomerCare() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: 'url(https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Care</h2>
        <p className="text-gray-600 mb-4">We are here to help you. Please fill out the form below and our team will get back to you as soon as possible.</p>

        <form className="flex flex-col space-y-3">
          <label className="text-left text-gray-700 font-medium">Full Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your full name" required />

          <label className="text-left text-gray-700 font-medium">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" required />

          <label className="text-left text-gray-700 font-medium">Message</label>
          <textarea className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your message" rows="4" required></textarea>

          <button type="submit" className="w-full p-2 bg-[#18abd7] text-white rounded hover:bg-[#1288a6] transition">Submit</button>
        </form>

        <div className="mt-4 text-gray-600">
          <p>Or contact us at: <a href="mailto:barterbridge@gmail.com" className="text-[#18abd7] hover:underline">barterbridge@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default CustomerCare;