import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Workshop = () => {
  const products = [
    {
      id: 1,
      name: "Javascript",
      description: "Learn modern JavaScript.",
      price: "699",
      detailUrl: "/WorkshopDetails",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
    {
      id: 2,
      name: "Python",
      description: "Master Python programming.",
      price: "999",
      detailUrl: "/WorkshopDetails",
      img: "https://i.pinimg.com/474x/c1/63/07/c16307103e86c604c6bc98c78aa84d4b.jpg",
    },
    {
      id: 3,
      name: "React.js",
      description: "Build amazing UIs with React.",
      price: "199",
      detailUrl: "/WorkshopDetails",
      img: "https://i.pinimg.com/474x/d9/82/4f/d9824ff2b80bbdc298db52a298208a7e.jpg",
    },
    {
      id: 4,
      name: "C++",
      description: "Deep dive into C++ programming.",
      price: "$199",
      detailUrl: "/WorkshopDetails",
      img: "https://i.pinimg.com/736x/33/60/71/336071d6cce6f1d803d7a7d2dfdb9351.jpg",
    },
    {
      id: 5,
      name: "PHP",
      description: "Learn backend development.",
      price: "199",
      detailUrl: "/WorkshopDetails",
      img: "https://i.pinimg.com/474x/8c/d9/b4/8cd9b4c87be7b2582b86dd28097370c2.jpg",
    },
    {
      id: 6,
      name: "SQL",
      description: "Master databases with SQL.",
      price: "199",
      detailUrl: "/WorkshopDetails",
      img: "https://i.pinimg.com/474x/8e/f8/5b/8ef85b0e2d71aea1532ba2092701a324.jpg",
    },
    {
      id: 7,
      name: "Node.js",
      description: "Server-side JavaScript with Node.js.",
      price: "199",
      detailUrl: "/WorkshopDetails",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuSph-eWxri7SsEZBb6l6VVPPFfaDO2dvCg&s",
    },
    {
      id: 8,
      name: "Tailwind CSS",
      description: "Style your site with Tailwind.",
      price: "199",
      detailUrl: "/WorkshopDetails",
      img: "https://i.pinimg.com/474x/2f/c6/5c/2fc65c04e8f408be698b1705e47f6b55.jpg",
    },
  ];
    useEffect(() => {
      AOS.init({ duration: 400 });
    }, []);
    
  return (
    <div className="w-full p-3 ">
      <div className="container mx-auto mt-8 py- px-9 w-full max-w-screen-2xl">
      <h2 className="text-3xl font-semibold mb-6">Featured Workshops</h2>
          <div className="flex items-center gap-6 mb-6 border-b pb-2">
            <span className="font-semibold border-b-2 border-orange-500 pb-1 cursor-pointer">All Workshops</span>
            <span className="text-gray-500 cursor-pointer">Language</span>
            <span className="text-gray-500 cursor-pointer">Instrument</span>
            <span className="text-gray-500 cursor-pointer">Finance</span>
            <span className="text-gray-500 cursor-pointer">Education</span>
            <Link to="/WorkShop" className="text-orange-500 font-medium ml-auto cursor-pointer">
               Browse All Workshop →
            </Link>
          </div>
       </div>   
      {/* Products Grid (4 Products Per Row) */}
      <div className="bg-gray-100 p-6 rounded-lg m-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      data-aos="zoom-in">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-44 rounded-md transition-transform transform hover:scale-105"
            />
            <h4 className="text-lg font-bold mt-3">{product.name}</h4>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-md font-bold text-gray-800">{product.price}</p>

            {/* Link to Detail Page */}
            <Link to={product.detailUrl}>
            
              <p className="mt-2  text-center bg-blue-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-blue-600 w-28">
                Enroll Now
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Banners Section */}
      
    </div>
  );
};

export default Workshop;
