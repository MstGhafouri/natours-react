import { toastr } from 'react-redux-toastr';
import natoursApi from '../../../api/natoursApi';
import history from '../../../history';
import { persistor } from '../../store';
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
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
      history.push('/me/settings');
    } catch (error) {
      dispatch({
        type: signUpUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const login = data => {
  return async dispatch => {
    try {
      dispatch({ type: loginUserRequest });
      const response = await natoursApi.post('/users/login', data);
      dispatch({
        type: loginUserSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Logged in successfully');
      history.push('/me/settings');
    } catch (error) {
      dispatch({
        type: loginUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      dispatch({ type: logoutUserRequest });
      await natoursApi.get('/users/logout');
      dispatch({
        type: logoutUserSuccess
      });
      persistor.purge();
      history.push('/');
    } catch (error) {
      dispatch({
        type: logoutUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};
