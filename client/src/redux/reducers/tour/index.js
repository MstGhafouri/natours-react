import { getToursSuccess, getTotalDocs } from '../../actions/types';

export const toursReducer = (state = [], action) => {
  switch (action.type) {
    case getToursSuccess:
      return action.payload;
    default:
      return state;
  }
};

export const countTotalDocsReducer = (state = 0, action) => {
  switch (action.type) {
    case getTotalDocs:
      return action.payload;
    default:
      return state;
  }
};
