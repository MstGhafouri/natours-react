import natoursApi from '../../../api/natoursApi';
import {
  getToursRequest,
  getToursSuccess,
  getToursFailure,
  getTotalDocs,
  setQueryParams
} from '../types';

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
      dispatch({ type: setQueryParams, payload: { page, sortBy } });
      dispatch({ type: getToursRequest });
      const response = await natoursApi.get(`/tours?${queryStr}`);
      dispatch({ type: getToursSuccess, payload: response.data.data.tours });
      dispatch({ type: getTotalDocs, payload: response.data.totalDocs });
    } catch (error) {
      dispatch({ type: getToursFailure, payload: error });
    }
  };
};
