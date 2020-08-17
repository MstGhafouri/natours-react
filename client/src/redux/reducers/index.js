import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { toursReducer, countTotalDocsReducer, tourReducer } from './tour';
import { userReducer } from './user';
import { queryReducer } from './query';
import { loadingReducer } from './loading';
import { errorReducer } from './error';

export default combineReducers({
  tours: toursReducer,
  selectedTour: tourReducer,
  user: userReducer,
  totalDocuments: countTotalDocsReducer,
  queryParams: queryReducer,
  loading: loadingReducer,
  error: errorReducer,
  toastr: toastrReducer,
  form: formReducer
});
