import React from 'react';

import { colorConfig } from '../../../utils';
import ReviewCard from './ReviewCard';

const TourReviews = ({ reviews, season }) => {
  return (
    <section
      className="section-reviews"
      style={{
        background: `linear-gradient(to right bottom, rgb(${colorConfig[season][0]}), rgb(${colorConfig[season][1]}))`
      }}
    >
      <div className="reviews">
        {reviews.map(review => (
          <ReviewCard
            key={review._id}
            {...review}
            iconColor={colorConfig[season][2]}
          />
        ))}
      </div>
    </section>
  );
};

export default TourReviews;
