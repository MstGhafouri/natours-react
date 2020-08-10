import natoursApi from '../../../api/natoursApi';
import { getToursRequest, getToursSuccess, getToursFailure } from '../types';

export const fetchTours = (queryStr = '') => {
  return async dispatch => {
    try {
      dispatch({ type: getToursRequest });
      const response = await natoursApi.get(`/tours?${queryStr}`);
      dispatch({ type: getToursSuccess, payload: response.data.data.tours });
    } catch (error) {
      dispatch({ type: getToursFailure, payload: error });
    }
  };
};
