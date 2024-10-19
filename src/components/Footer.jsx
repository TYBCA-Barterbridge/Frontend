import React from 'react';

const Footer = () => {
  return (
    <footer>
      <style jsx>{`
        .footer,
        .footer * {
          box-sizing: border-box;
        }

        .footer {
          background: #4a4947;
          border-top: 1px solid #d9d9d9; /* Border at the top of the footer */
          padding: 32px 32px; /* Adjust padding as needed */
          display: flex;
          flex-direction: row;
          gap: 16px;
          align-items: center;
          justify-content: center;
        }

        .title {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: flex-start;
          justify-content: flex-start;
          flex-shrink: 0;
          width: 300px;
          min-width: 240px;
          position: relative;
        }
      `}</style>
      <div className="footer">
        <div className="title">
          &copy; 2024 BarterBridge: All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;