import React from 'react';

import PictureBox from './PictureBox';

const TourPictures = ({ images }) => {
  return (
    <section className="section-pictures">
      <PictureBox
        image={`${process.env.PUBLIC_URL}/img/tours/${images[0]}`}
        imgNum={1}
      />
      <PictureBox
        image={`${process.env.PUBLIC_URL}/img/tours/${images[1]}`}
        imgNum={2}
      />
      <PictureBox
        image={`${process.env.PUBLIC_URL}/img/tours/${images[2]}`}
        imgNum={3}
      />
    </section>
  );
};

export default TourPictures;
