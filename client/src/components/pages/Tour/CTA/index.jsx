import React from 'react';
import { connect } from 'react-redux';

import { colorConfig } from '../../../utils';
import CustomBtn from '../../../utils/CustomBtn';

const TourCTA = ({ duration, images, season, currentUser }) => {
  return (
    <section className="section-cta">
      <div className="cta">
        <div
          className="cta__img cta__img--logo"
          style={{
            background: `linear-gradient(to right bottom, rgb(${colorConfig[season][0]}), rgb(${colorConfig[season][1]}))`
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/icons/logo-white.png`}
            alt="Natours logo"
          />
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/img/tours/${images[0]}`}
          alt="tour"
          className="cta__img cta__img--1"
        />
        <img
          src={`${process.env.PUBLIC_URL}/img/tours/${images[2]}`}
          alt="tour"
          className="cta__img cta__img--2"
        />

        <div className="cta__content">
          <h2
            className="heading-secondary"
            style={{
              backgroundImage: `linear-gradient(to right, rgb(${colorConfig[season][0]}), rgb(${colorConfig[season][1]}))`
            }}
          >
            What are you waiting for?
          </h2>
          <p className="cta__text">
            {`${duration} days. 1 adventure. Infinite memories. Make it yours today!`}
          </p>
          <CustomBtn
            classes="custom-btn span-all-rows"
            rgb={colorConfig[season][1]}
            isLink={!!!currentUser}
            linkTo="/login"
          >
            {currentUser ? 'Book tour now' : 'Log in to book'}
          </CustomBtn>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps)(TourCTA);
