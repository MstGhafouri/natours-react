import React from 'react';
import { Icon } from 'semantic-ui-react';

import { colorConfig } from '../../../utils';
import Detail from './Detail';

const TourDescription = ({
  name,
  date,
  difficulty,
  size,
  ratingsAverage,
  guides,
  description,
  season
}) => {
  const headingStyle = {
    backgroundImage: `linear-gradient(to right, rgb(${colorConfig[season][0]}), rgb(${colorConfig[season][1]}))`
  };

  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary mb-lg" style={headingStyle}>
              Quick facts
            </h2>
            <Detail
              label="Next date"
              text={new Date(date).toLocaleString('en-us', {
                month: 'long',
                year: 'numeric'
              })}
            >
              <Icon
                color={colorConfig[season][2]}
                className="calendar outline"
              />
            </Detail>
            <Detail label="Difficulty" text={difficulty}>
              <Icon color={colorConfig[season][2]} className="chart line" />
            </Detail>
            <Detail label="Participants" text={`${size} people`}>
              <Icon color={colorConfig[season][2]} className="users" />
            </Detail>
            <Detail label="Rating" text={`${ratingsAverage} / 5`}>
              <Icon color={colorConfig[season][2]} className="star" />
            </Detail>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary mb-lg" style={headingStyle}>
              Your tour guides
            </h2>
            {guides.map(guide => (
              <Detail
                label={
                  guide.role === 'lead-guide' ? 'Lead Guide' : 'Tour Guide'
                }
                text={guide.name}
                key={guide._id}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/img/users/${guide.photo}`}
                  alt={guide.name}
                  className="overview-box__img"
                />
              </Detail>
            ))}
          </div>
        </div>
      </div>

      <div className="description-box">
        <h2
          className="heading-secondary mb-lg"
          style={headingStyle}
        >{`About ${name} tour`}</h2>
        <p className="description__text">{description.split('\n')[0]}</p>
        <p className="description__text">{description.split('\n')[1]}</p>
      </div>
    </section>
  );
};

export default TourDescription;
