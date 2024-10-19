import React from 'react';
import painting from '../images/painting.webp'; // Adjust the path as necessary
import violin from '../images/violin.jpg'; // Adjust the path as necessary
import workshop from '../images/workshop.jpg';

function Home() {
  return (
    <>
      <div
        className="hero-actions"
        style={{
          backgroundImage: `url(background-image.jpg)`, // Use backticks for template literals
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="hero-text-content">
          <div className="hero-title">BarterBridge</div>
          <div className="hero-subtitle">
            &quot;Trade What You Have, Find What You Need&quot;
          </div>
        </div>
      </div>
      <div className="panel-image">
        <img className="pimage" src={workshop} alt="Workshop setting with various activities" />
      </div>
      <div className="panel-image-double">
        <img className="image" src={painting} alt="Beautiful painting" />
        <img className="image" src={violin} alt="Violin placed on a table" />
      </div>
    </>
  );
}

export default Home;
