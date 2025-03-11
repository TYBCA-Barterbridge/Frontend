import React from "react";

const ChatIcon = () => {
  return (
    <div className="fixed bottom-5 right-5 w-[50px] h-[50px] bg-gray-600 border-2 border-white text-white text-2xl flex justify-center items-center rounded-full shadow-md cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg active:scale-95 active:shadow-md">
      <img 
        className="w-[35px]" 
        src="https://img.icons8.com/?size=100&id=87203&format=png&color=FFFFFF" 
        alt="Chat Icon" 
      />
    </div>
  );
};

export default ChatIcon;
