import React from 'react';
import { Icon } from 'semantic-ui-react';

// import '' from '../../../../assets/img/tours/tour-1-cover.jpg';

const TourHeader = () => {

  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img src={''} alt="tour" className="header__hero-img" />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>
            The Park <br />
            Camper Tour
          </span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <Icon name="clock" />
            <span className="heading-box__text">10 days</span>
          </div>
          <div className="heading-box__detail">
            <Icon name="map marker alternate" />
            <span className="heading-box__text">Las Vegas, USA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourHeader;
