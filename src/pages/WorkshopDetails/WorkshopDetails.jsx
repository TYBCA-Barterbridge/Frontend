import { useState } from "react";

const WorkshopPage = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  
  const episodes = [
    { title: "Episode 01 | Inception",description: "Data management is essential in React development. In this episode, we explore how to handle and manipulate data using state, props, and other powerful React techniques." , duration: "1h 39m 0s", videoUrl: "https://youtu.be/M9O5AjEFzKw?si=MWBF7wn0Tmi5bC0U" },
    { title: "Episode 02 | Igniting our App",description: "In this episode, we ignite our React app development journey. We dive into the fundamentals, exploring React components, JSX, and the key concepts that power React. It's the essential foundation for c....", duration: "2h 12m 30s", videoUrl: "https://youtu.be/u4WOgV6nRIc?si=pBJCrjDtHGaUsQy0" },
    { title: "Episode 03 | Laying the foundation",description: "Building on the basics, we lay a solid foundation for our React app. You'll learn about component hierarchies, how to pass data with props, and manage component state. These core concepts are the buil....", duration: "2h 0m 0s", videoUrl: "/videos/episode3.mp4" },
    { title: "Episode 04 | Talk is Cheap, Show Me the Code",description: "In this hands-on episode, we move from theory to practice. You'll write your first React components, gaining practical experience in bringing your ideas to life. It's the moment when you see the magic of React in action.", duration: "2h 14m 30s", videoUrl: "/videos/episode4.mp4" },
    { title: "Episode 05 | Let's Get Hooked",description: "Hooks are the game-changer in React development, and in this episode, we explore them in depth. You'll discover how to use state and other React features with Hooks, bringing a new level of power and ....", duration: "2h 9m 18s", videoUrl: "/videos/episode5.mp4" },
    { title: "Episode 06 | Exploring the World",description: "Navigation is essential, and in this episode, we delve into React routing. You'll learn how to navigate seamlessly within your app, creating a smooth and user-friendly experience.", duration: "2h 22m 43s", videoUrl: "/videos/episode6.mp4" }
  ];

  return (
    <div className="flex flex-col md:flex-row p-6 min-h-screen">
      {/* Left Side - Video Section */}
      <div className="md:w-2/3 pr-4 text-black">
        <div className="w-full h-130 bg-black flex items-center justify-center">
          <video key={episodes[selectedEpisode].videoUrl} controls className="w-full h-full">
            <source src={episodes[selectedEpisode].videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">{episodes[selectedEpisode].title}</h2>
          <p className="text-gray-600 mt-2">{episodes[selectedEpisode].description}</p>
        </div>
      </div>
      
      {/* Right Side - Episode List */}
      <div className="md:w-1/3 bg-gray-900 p-4 rounded-lg text-white">
        <h3 className="text-lg font-bold mb-4">Workshop Episodes</h3>
        <ul>
          {episodes.map((episode, index) => (
            <li 
              key={index} 
              className={`p-2 mb-2 cursor-pointer rounded-lg ${selectedEpisode === index ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`} 
              onClick={() => setSelectedEpisode(index)}
            >
              <span className="block font-semibold">{episode.title}</span>
              <span className="text-sm text-gray-300">{episode.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkshopPage;
