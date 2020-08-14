import React from 'react';
import { Icon } from 'semantic-ui-react';

import { colorConfig } from '../../../utils';

const TourHeader = ({ name, image, duration, locationText, season }) => {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div
          className="header__hero-overlay"
          style={{
            backgroundImage: `linear-gradient(
            to right bottom,
            rgb(${colorConfig[season][0]}),
            rgb(${colorConfig[season][1]})
          )`
          }}
        >
          &nbsp;
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/img/tours/${image}`}
          alt="tour"
          className="header__hero-img"
        />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span
            style={{
              backgroundImage: `linear-gradient(
            to right bottom,
            rgba(${colorConfig[season][0]}, 0.85),
            rgba(${colorConfig[season][1]}, 0.85)
          )`
            }}
          >
            {name}
          </span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <Icon name="clock" />
            <span className="heading-box__text">{`${duration} days`}</span>
          </div>
          <div className="heading-box__detail">
            <Icon name="map marker alternate" />
            <span className="heading-box__text">{locationText}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourHeader;
