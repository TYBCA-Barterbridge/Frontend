import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-14 font-sans">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8 min-h-[26vh] px-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">BarteBridge</h1>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter Your Email*"
              className="p-2 text-sm border border-gray-300 rounded flex-1 mr-2"
            />
            <button className="bg-[#18abd7] text-white px-4 py-2 rounded text-sm hover:bg-[#1596b8]">
              Subscribe
            </button>
          </div>
          <p className="text-sm">Get monthly updates and free resources.</p>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">CONTACT US</h3>
          <p className="text-sm">Phone: +91 0000000000</p>
          <p className="text-sm">Email: barterbridge@gmail.com</p>
          <p className="text-sm">Address: Don Bosco College Panjim Goa 403001</p>
          <div className="flex gap-3 mt-3 ">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-9 h-8 cursor-pointer transition-transform hover:scale-110"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
                className="w-9 h-8 cursor-pointer transition-transform hover:scale-110"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                alt="Instagram"
                className="w-9 h-8 cursor-pointer transition-transform hover:scale-110"
              />
            </a>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">RECENT NEWS</h3>
          <ul className="text-sm space-y-2">
            <li className="cursor-pointer hover:underline">About Us</li>
            <li className="cursor-pointer hover:underline">Services</li>
            <li className="cursor-pointer hover:underline">Get In Touch</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
