import React from 'react';
import painting from '../images/painting.webp'; // Adjust the path as necessary
import violin from '../images/violin.jpg'; // Adjust the path as necessary
import workshop from '../images/workshop.jpg';

function Home() {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginTop: '150px' }}>BarterBridge</h1>
      <p style={{ textAlign: 'center' }}>
      "Trade What You Have, Find What You Need"
      </p>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .container {
            max-width: 90%;
          }
        }
        .panel-image-double,
        .panel-image-double * {
          box-sizing: border-box;
        }
        .panel-image-double {
          background: var(--var-sds-color-background-default-default, #ffffff);
          opacity: 0.8;
          padding: var(--var-sds-size-space-1600, 64px);
          display: flex;
          flex-direction: row;
          gap: var(--var-sds-size-space-1200, 48px);
          align-items: flex-start;
          justify-content: flex-start;
          height: 400px;
          position: relative;
        }
        .image {
          display: flex;
          flex-direction: column;
          gap: 0px;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          flex: 1;
          position: relative;
          overflow: hidden;
          object-fit: cover;
        }
        .panel-image,
        .panel-image * {
          box-sizing: border-box;
        }
        .panel-image {
          background: var(--var-sds-color-background-default-default, #ffffff);
          opacity: 0.8;
          padding: var(--var-sds-size-space-1600, 64px);
          display: flex;
          flex-direction: column;
          gap: var(--var-sds-size-space-1200, 48px);
          align-items: flex-start;
          justify-content: flex-start;
          height: 493px;
          position: relative;
        }
        .image {
          display: flex;
          flex-direction: column;
          gap: 0px;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          flex-shrink: 0;
          height: 349px;
          position: relative;
          overflow: hidden;
          object-fit: cover;
        }
      `}</style>
      <div className="panel-image">
        <img className="image" src={workshop} alt="Description of image0" />
      </div>
      <div className="panel-image-double"> 
        <img className="image" src={painting} alt="Painting" /> 
        <img className="image" src={violin} alt="Violin" /> 
      </div>
    </div>
  );
}

export default Home;