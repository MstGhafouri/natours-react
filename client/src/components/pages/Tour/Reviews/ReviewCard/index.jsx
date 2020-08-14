import React from 'react';
import { Icon } from 'semantic-ui-react';

// import coverImg from '../../../../../assets/img/tours/tour-1-cover.jpg';

const ReviewCard = ({ user: { name, photo }, review, rating, iconColor }) => {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src={`${process.env.PUBLIC_URL}/img/users/${photo}`}
          alt={name}
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">{name}</h6>
      </div>
      <p className="reviews__text">{review}</p>
      <div className="reviews__rating">
        {[1, 2, 3, 4, 5].map(start => (
          <Icon
            className="star"
            key={start}
            color={`${rating >= start ? iconColor : 'grey'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
