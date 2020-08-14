import { combineReducers } from 'redux';

import { toursReducer, countTotalDocsReducer, tourReducer } from './tour';
import { queryReducer } from './query';
import { loadingReducer } from './loading';
import { errorReducer } from './error';

export default combineReducers({
  tours: toursReducer,
  selectedTour: tourReducer,
  totalDocuments: countTotalDocsReducer,
  queryParams: queryReducer,
  loading: loadingReducer,
  error: errorReducer
});
