import { toastr } from 'react-redux-toastr';
import natoursApi from '../../../api/natoursApi';
import history from '../../../history';
import { persistor } from '../../store';
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  uploadPhotoRequest,
  uploadPhotoSuccess,
  uploadPhotoFailure,
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

export const resetUserPassword = data => {
  return async dispatch => {
    try {
      dispatch({ type: resetPasswordRequest });
      await natoursApi.post('/users/forgotPassword', data);
      dispatch({
        type: resetPasswordSuccess
      });
      toastr.info(
        'Email sent!',
        'Check your email for a link to reset your password'
      );
    } catch (error) {
      dispatch({
        type: resetPasswordFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const changeUserPassword = (data, token) => {
  return async dispatch => {
    try {
      dispatch({ type: changePasswordRequest });
      const response = await natoursApi.patch(
        `/users/resetPassword/${token}`,
        data
      );
      dispatch({
        type: changePasswordSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your password has been changed successfully');
    } catch (error) {
      dispatch({
        type: changePasswordFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const uploadUserPhoto = file => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      dispatch({ type: uploadPhotoRequest });
      const response = await natoursApi.patch('/users/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({
        type: uploadPhotoSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your photo has been updated successfully');
    } catch (error) {
      dispatch({
        type: uploadPhotoFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};
