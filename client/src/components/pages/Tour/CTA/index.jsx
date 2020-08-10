import React from 'react';

import CustomBtn from '../../../utils/CustomBtn';
// import coverImg from '../../../../assets/img/tours/tour-1-cover.jpg';
// import logo from '../../../../assets/img/icons/logo-white.png';

const TourCTA = () => {
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src={''} alt="Natours logo" />
        </div>
        <img src={''} alt="" className="cta__img cta__img--1" />
        <img src={''} alt="" className="cta__img cta__img--2" />

        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            10 days. 1 adventure. Infinite memories. Make it yours today!
          </p>
          <CustomBtn
            classes="custom-btn span-all-rows"
            rgb="40, 180, 133"
            isLink={false}
          >
            Book tour now!
          </CustomBtn>
        </div>
      </div>
    </section>
  );
};

export default TourCTA;
