import { Link } from "react-router-dom";

const Skills = () => {
    const skills = [
      { id: 1, name: "guitar", image: "./public/images/1.jpg", rating: 4, reviews: 994 },
      { id: 2, name: "guitar", image:"./public/images/4.jpg", rating: 5, reviews: 798 },
      { id: 3, name: "guitar", image: "./public/images/1.jpg", rating: 5, reviews: 600 },
      { id: 4, name: "guitar", image: "./public/images/2.jpg", rating: 4, reviews: 740 },
      { id: 5, name: "guitar", image: "./public/images/5.jpg", rating: 4, reviews: 556 },
      { id: 6, name: "guitar", image: "./public/images/4.jpg", rating: 4, reviews: 536 },
      { id: 7, name: "guitar", image: "./public/images/6.jpg", rating: 4, reviews: 536 },
      { id: 8, name: "guitar", image: "./public/images/1.jpg", rating: 4, reviews: 536 },
    ];
  
    return (
       
        <div className="container mx-auto mt-8 mb-8 py-4 px-9 w-full max-w-screen-2xl">
          
          <div className="grid grid-cols-1 bg-gray-50 p-6 rounded-xl h-190 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map(skill => (
              <div key={skill.id} className="border-gray rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white">
                <img src={skill.image} alt={skill.name} className="w-full h-50 object-cover" />
                <div className="flex items-center mt-4">
                  <span className="text-orange-500">{'★'.repeat(skill.rating)}{'☆'.repeat(5 - skill.rating)}</span>
                  <span className="text-gray-500 ml-2">({skill.reviews})</span>
                </div>
                <p className="text-lg font-medium mt-2 text-center">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      
      

    );
  };
  
  export default Skills;
  