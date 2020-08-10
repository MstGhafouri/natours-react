import { getToursSuccess } from '../../actions/types';

export const toursReducer = (state = [], action) => {
  switch (action.type) {
    case getToursSuccess:
      return action.payload;
    default:
      return state;
  }
};
