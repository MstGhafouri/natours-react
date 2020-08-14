import React from 'react';

const PictureBox = ({ image, imgNum }) => {
  return (
    <div className="picture-box">
      <img
        className={`picture-box__img picture-box__img--${imgNum}`}
        src={image}
        alt="Tour"
      />
    </div>
  );
};

export default PictureBox;
