import React from 'react';

import coverImg from '../../../../assets/img/tours/tour-1-cover.jpg';

const TourPictures = () => {
  return (
    <section className="section-pictures">
      <div className="picture-box">
        <img
          className="picture-box__img picture-box__img--1"
          src={coverImg}
          alt="The Park Camper Tour 1"
        />
      </div>
      <div className="picture-box">
        <img
          className="picture-box__img picture-box__img--2"
          src={coverImg}
          alt="The Park Camper Tour 1"
        />
      </div>
      <div className="picture-box">
        <img
          className="picture-box__img picture-box__img--3"
          src={coverImg}
          alt="The Park Camper Tour 1"
        />
      </div>
    </section>
  );
};

export default TourPictures;
