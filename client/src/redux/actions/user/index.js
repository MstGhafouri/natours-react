import { toastr } from 'react-redux-toastr';
import natoursApi from '../../../api/natoursApi';
import history from '../../../history';
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  signUpUserRequest,
  signUpUserSuccess,
  signUpUserFailure
} from '../types';

export const signup = data => {
  return async dispatch => {
    try {
      dispatch({ type: signUpUserRequest });
      const response = await natoursApi.post('/users/signup', data);
      dispatch({
        type: signUpUserSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your registration was successful');
      history.push("/me/settings");
    } catch (error) {
      dispatch({ type: signUpUserFailure, payload: error.response.data.message });
      toastr.error('Error', error.response.data.message);
    }
  };
};
