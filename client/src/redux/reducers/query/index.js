import { setQueryParams } from '../../actions/types';
import { INITIAL_QUERY } from '../../actions/tour';

export const queryReducer = (state = INITIAL_QUERY, action) => {
  switch (action.type) {
    case setQueryParams:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
