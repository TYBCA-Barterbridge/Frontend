import React from 'react';

const Footer = () => {
  return (
    <div>
      <style>
        {`
          .footer,
          .footer * {
            box-sizing: border-box;
          }

          .footer {
            background: #4a4947;
            border-style: solid;
            border-color: #d9d9d9;
            border-width: 1px 0px 0px 0px;
            padding: 32px 32px 160px 32px;
            display: flex;
            flex-direction: row;
            gap: 16px;
            row-gap: 16px;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-content: flex-start;
            position: relative;
            overflow: hidden;
          }

          .title {
            display: flex;
            flex-direction: column;
            gap: 24px;
            align-items: flex-start;
            justify-content: flex-start;
            flex-shrink: 0;
            width: 262px;
            min-width: 240px;
            position: relative;
          }

          .button-list {
            display: flex;
            flex-direction: row;
            gap: 16px;
            align-items: center;
            justify-content: flex-start;
            flex-shrink: 0;
            position: relative;
          }
        `}
      </style>
      <div className="footer">
        <div className="title">
          <div className="button-list">
            &copy; 2024 BarterBridge: All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;