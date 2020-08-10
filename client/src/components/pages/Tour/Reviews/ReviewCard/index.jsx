import React from 'react';
import { Icon } from 'semantic-ui-react';

// import coverImg from '../../../../../assets/img/tours/tour-1-cover.jpg';

const ReviewCard = () => {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img src={''} alt="Jim Brown" className="reviews__avatar-img" />
        <h6 className="reviews__user">Jim Brown</h6>
      </div>
      <p className="reviews__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
        dignissimos sint quo commodi corrupti accusantium veniam saepe numquam.
      </p>
      <div className="reviews__rating">
        <Icon className="star" />
        <Icon className="star" />
        <Icon className="star" />
        <Icon className="star" />
        <Icon className="star" />
      </div>
    </div>
  );
};

export default ReviewCard;
