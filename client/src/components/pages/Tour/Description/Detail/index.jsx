import React from 'react';

const Detail = ({ children, label, text }) => {
  return (
    <div className="overview-box__detail">
      {children}
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
};

export default Detail;
