import React from 'react';
import { connect } from 'react-redux';

import { loadingSelector as createLoadingSelector } from '../../../../redux/reducers/loading';
import { bookTour } from '../../../../redux/actions/stripe';
import { colorConfig } from '../../../utils';
import ButtonLoader from '../../../utils/ButtonLoader';
import CustomBtn from '../../../utils/CustomBtn';

const TourCTA = ({
  duration,
  images,
  season,
  currentUser,
  tourId,
  bookTour,
  isLoading
}) => {
  const onBookTourClicked = tourId => {
    bookTour(tourId);
  };

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
            type="button"
            rgb={colorConfig[season][1]}
            isLink={!!!currentUser}
            linkTo="/login"
            onClick={() => onBookTourClicked(tourId)}
          >
            {currentUser ? (
              <ButtonLoader
                isLoading={isLoading}
                text="Book tour now"
                loadingText="Processing"
              />
            ) : (
              'Log in to book'
            )}
          </CustomBtn>
        </div>
      </div>
    </section>
  );
};

const loadingSelector = createLoadingSelector(['BOOK_TOUR']);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isLoading: loadingSelector(state)
});

export default connect(mapStateToProps, { bookTour })(TourCTA);
