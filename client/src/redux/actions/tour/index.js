import natoursApi from '../../../api/natoursApi';
import {
  getToursRequest,
  getToursSuccess,
  getToursFailure
} from '../types';

export const fetchTours = () => {
  return async dispatch => {
    try {
      dispatch({ type: getToursRequest });
      const response = await natoursApi.get('/tours');
      dispatch({ type: getToursSuccess, payload: response.data.data.tours });
    } catch (error) {
      dispatch({ type: getToursFailure, payload: error });
    }
  };
};
