import * as types from './types';
import errorHandler from './errorHandler';
import natoursApi from '../../api/natoursApi';

const stripe = window?.Stripe?.(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const bookTour = tourId => {
  return async dispatch => {
    try {
      dispatch({ type: types.bookTourRequest });
      const session = await natoursApi.get(
        `/bookings/checkout-session/${tourId}`
      );

      await stripe.redirectToCheckout({
        sessionId: session.data.session.id
      });
    } catch (error) {
      errorHandler(error, dispatch, types.bookTourFailure);
    }
  };
};
