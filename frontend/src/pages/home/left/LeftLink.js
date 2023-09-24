import React from 'react';

const LeftLink = ({ img, text, notification }) => {
  return (
    <div className="left-home-link hover1">
      <img src={`../../../left/${img}.png`} alt={text} />
      <div className="left-home-link-col">
        <div className="left-home-link-col-text">{text}</div>
        {notification && (
          <div className="left-home-link-col-notification">{notification}</div>
        )}
      </div>
    </div>
  );
};

export default LeftLink;
