import { Link } from "react-router-dom";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

const Workshop = () => {
  const products = [
    {
      id: 1,
      name: "Javascript",
      description: "Learn modern JavaScript.",
      price: "699",
      detailUrl: "/product/1",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
    {
      id: 2,
      name: "Python",
      description: "Master Python programming.",
      price: "999",
      detailUrl: "/product/2",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
    {
      id: 3,
      name: "React.js",
      description: "Build amazing UIs with React.",
      price: "199",
      detailUrl: "/product/3",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
    {
      id: 4,
      name: "C++",
      description: "Deep dive into C++ programming.",
      price: "$199",
      detailUrl: "/product/4",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
    {
      id: 5,
      name: "PHP",
      description: "Learn backend development.",
      price: "199",
      detailUrl: "/product/5",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
    {
      id: 6,
      name: "SQL",
      description: "Master databases with SQL.",
      price: "199",
      detailUrl: "/product/6",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
    {
      id: 7,
      name: "Node.js",
      description: "Server-side JavaScript with Node.js.",
      price: "199",
      detailUrl: "/product/7",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuSph-eWxri7SsEZBb6l6VVPPFfaDO2dvCg&s",
    },
    {
      id: 8,
      name: "Tailwind CSS",
      description: "Style your site with Tailwind.",
      price: "199",
      detailUrl: "/product/8",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlD_-mtjCiRSWCIX_dRNBLBBkoJ4nDy_i_A&s",
    },
  ];

  return (
    <div className="w-full p-4">
      {/* Product Carousel */}
      <div className="text-center text-4xl italic font-medium mb-6">
        <ProductCarousel products={products} />
      </div>

      {/* Products Grid (4 Products Per Row) */}
      <div className="bg-gray-100 p-6 rounded-lg m-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <img className="w-[45vw] h-[35vh] object-cover rounded-lg" src="/images/banner-2.png" alt="Banner 1" />
        <img className="w-[45vw] h-[35vh] object-cover rounded-lg" src="https://i.pinimg.com/736x/bc/81/b8/bc81b80d3f480c703d336d096c43649e.jpg" alt="Banner 2" />
      </div>
    </div>
  );
};

export default Workshop;
