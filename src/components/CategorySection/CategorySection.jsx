import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


const CategorySection = () => {
  const categories = [
    {
      title: "Barter Exchange",
      image: "images/goodexchange.png",
      link: "/Goods", 
    },
    {
      title: "Skill Exchange",
      image: "images/skillexchange.png",
      link: "/Skills", 
    },
    {
      title: "Workshop",
      image: "images/workshop.png",
      link: "/WorkShop",
    },
  ];
  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);
  
    return (
      <div className="flex flex-col items-center py-10 ">
        <h2 className="text-3xl font-semibold mb-8" data-aos="zoom-in-up">Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 ">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border hover:shadow-xl transition-shadow cursor-pointer"
              data-aos="zoom-in-up"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-55 h-45 rounded-lg object-cover mb-4"
              />
              <h3 className="text-lg font-medium text-center" >{category.title}</h3>
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  export default CategorySection;