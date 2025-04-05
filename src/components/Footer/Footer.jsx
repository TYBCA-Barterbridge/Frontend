import React from "react";

const Footer = () => {  

  return (
  <>
  <footer className=" bg-gray-800 text-white py-14 font-sans overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8 min-h-[26vh] px-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">BarteBridge</h1>
          <div className="flex-1">
          <h3 className="text-lg font-semibold">CONTACT US</h3>
          <p className="text-sm">Phone: +91 0000000000</p>
          <p className="text-sm">Email: barterbridge@gmail.com</p>
          <p className="text-sm">Address: Don Bosco College Panjim Goa 403001</p>
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
  </>
  );
};

export default Footer;
