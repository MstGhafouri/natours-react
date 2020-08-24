import { toastr } from 'react-redux-toastr';

import * as types from './types';
import natoursApi from '../../api/natoursApi';

const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const bookTour = tourId => {
  return async dispatch => {
    try {
      dispatch({ type: types.bookTourRequest });
      const session = await natoursApi.get(
        `/bookings/checkout-session/${tourId}`
      );
      // console.log(session);
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id
      });
    } catch (error) {
      dispatch({
        type: types.bookTourFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};
