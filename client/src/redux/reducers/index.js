import { combineReducers } from 'redux';

import { toursReducer } from './tour';
import { loadingReducer } from './loading';
import { errorReducer } from './error';

export default combineReducers({
  tours: toursReducer,
  loading: loadingReducer,
  error: errorReducer
});
