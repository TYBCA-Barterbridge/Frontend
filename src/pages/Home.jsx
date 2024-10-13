import React from 'react';

function Home() {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginTop: '150px' }}>Home Page</h1>
      <p style={{textAlign:'center'}}>
        Welcome to the Home Page.
      </p>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: 'center';
        }

        @media (max-width: 768px) {
          .container {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;