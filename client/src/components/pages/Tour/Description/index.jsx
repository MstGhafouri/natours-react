import React from 'react';
import { Icon } from 'semantic-ui-react';

// import '' from '../../../../assets/img/tours/tour-1-cover.jpg';

const TourDescription = () => {
  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary mb-lg">Quick facts</h2>
            <div className="overview-box__detail">
              <Icon color="green" className="calendar outline" />
              <span className="overview-box__label">Next date</span>
              <span className="overview-box__text">August 2021</span>
            </div>
            <div className="overview-box__detail">
              <Icon color="green" className="chart line" />
              <span className="overview-box__label">Difficulty</span>
              <span className="overview-box__text">Medium</span>
            </div>
            <div className="overview-box__detail">
              <Icon color="green" className="users" />
              <span className="overview-box__label">Participants</span>
              <span className="overview-box__text">10 people</span>
            </div>
            <div className="overview-box__detail">
              <Icon color="green" className="star" />
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">4.9 / 5</span>
            </div>
          </div>

          <div className="overview-box__group">
            <h2 className="heading-secondary mb-lg">Your tour guides</h2>

            <div className="overview-box__detail">
              <img
                src={''}
                alt="Lead guide"
                className="overview-box__img"
              />
              <span className="overview-box__label">Lead guide</span>
              <span className="overview-box__text">Steven Miller</span>
            </div>
            <div className="overview-box__detail">
              <img
                src={''}
                alt="Tour guide"
                className="overview-box__img"
              />
              <span className="overview-box__label">Tour guide</span>
              <span className="overview-box__text">Lisa Brown</span>
            </div>
            <div className="overview-box__detail">
              <img
                src={''}
                alt="Intern"
                className="overview-box__img"
              />
              <span className="overview-box__label">Intern</span>
              <span className="overview-box__text">Max Smith</span>
            </div>
          </div>
        </div>
      </div>

      <div className="description-box">
        <h2 className="heading-secondary mb-lg">
          About the park camper tour
        </h2>
        <p className="description__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p className="description__text">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum!
        </p>
      </div>
    </section>
  );
};

export default TourDescription;
