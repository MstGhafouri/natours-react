import { combineReducers } from 'redux';

import { toursReducer, countTotalDocsReducer } from './tour';
import { queryReducer } from './query';
import { loadingReducer } from './loading';
import { errorReducer } from './error';

export default combineReducers({
  tours: toursReducer,
  totalDocuments: countTotalDocsReducer,
  queryParams: queryReducer,
  loading: loadingReducer,
  error: errorReducer
});
