import natoursApi from '../../../api/natoursApi';
import errorHandler from '../errorHandler';
import * as types from '../types';

export const INITIAL_QUERY = {
  searchTerm: null,
  page: 1,
  sortBy: 'createdAt'
};

export const fetchTours = (queryObj = INITIAL_QUERY) => {
  return async (dispatch, getState) => {
    try {
      // Create query string
      let { page, sortBy } = queryObj;
      page = page || getState().queryParams.page;
      sortBy = sortBy || getState().queryParams.sortBy;
      const queryStr = `page=${page}&sort=${sortBy}`;
      // Dispatch actions
      dispatch({ type: types.setQueryParams, payload: { page, sortBy } });
      dispatch({ type: types.getToursRequest });
      const response = await natoursApi.get(`/tours?${queryStr}`);
      dispatch({
        type: types.getToursSuccess,
        payload: response.data.data.tours
      });
      dispatch({ type: types.getTotalDocs, payload: response.data.totalDocs });
    } catch (error) {
      errorHandler(error, dispatch, types.getToursFailure);
    }
  };
};

export const fetchTour = slug => {
  return async dispatch => {
    try {
      dispatch({ type: types.getTourRequest });
      const response = await natoursApi.get(`/tours/slug/${slug}`);
      dispatch({
        type: types.getTourSuccess,
        payload: response.data.data.tour
      });
    } catch (error) {
      errorHandler(error, dispatch, types.getTourFailure);
    }
  };
};
