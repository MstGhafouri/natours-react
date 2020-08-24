import { toastr } from 'react-redux-toastr';
import history from '../../../history';
import * as types from '../types';

export default (error, dispatch, type) => {
  if (error.response) {
    const {
      status,
      data: { message }
    } = error.response;

    dispatch({ type, payload: { message, status } });
    toastr.error('Error', message);

    switch (status) {
      case 404:
        if (type !== types.resetPasswordFailure) history.push('/404');
        break;
      case 401:
        dispatch({
          type: types.logoutUserSuccess
        });
        history.push('/login');
        break;
      default:
        break;
    }
  } else {
    dispatch({ type, payload: { message: error, status: 500 } });
    toastr.error('Error', 'Something went wrong !');
  }
};
