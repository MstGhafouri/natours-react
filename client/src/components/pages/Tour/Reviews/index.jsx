import React from 'react';

import ReviewCard from './ReviewCard';

const TourReviews = () => {
  return (
    <section className="section-reviews">
      <div className="reviews">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </section>
  );
};

export default TourReviews;
