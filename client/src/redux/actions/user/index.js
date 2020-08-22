import { toastr } from 'react-redux-toastr';
import natoursApi from '../../../api/natoursApi';
import history from '../../../history';
import { persistor } from '../../store';
import * as type from '../types';

export const signup = data => {
  return async dispatch => {
    try {
      dispatch({ type: type.signUpUserRequest });
      const response = await natoursApi.post('/users/signup', data);
      dispatch({
        type: type.signUpUserSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your registration was successful');
      history.push('/me/settings');
    } catch (error) {
      dispatch({
        type: type.signUpUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const login = data => {
  return async dispatch => {
    try {
      dispatch({ type: type.loginUserRequest });
      const response = await natoursApi.post('/users/login', data);
      dispatch({
        type: type.loginUserSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Logged in successfully');
      history.push('/me/settings');
    } catch (error) {
      dispatch({
        type: type.loginUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      dispatch({ type: type.logoutUserRequest });
      await natoursApi.get('/users/logout');
      dispatch({
        type: type.logoutUserSuccess
      });
      persistor.purge();
      history.push('/');
    } catch (error) {
      dispatch({
        type: type.logoutUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const resetUserPassword = data => {
  return async dispatch => {
    try {
      dispatch({ type: type.resetPasswordRequest });
      await natoursApi.post('/users/forgotPassword', data);
      dispatch({
        type: type.resetPasswordSuccess
      });
      toastr.info(
        'Email sent!',
        'Check your email for a link to reset your password'
      );
    } catch (error) {
      dispatch({
        type: type.resetPasswordFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const changeUserPassword = (data, token) => {
  return async dispatch => {
    try {
      dispatch({ type: type.changePasswordRequest });
      const response = await natoursApi.patch(
        `/users/resetPassword/${token}`,
        data
      );
      dispatch({
        type: type.changePasswordSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your password has been changed successfully');
    } catch (error) {
      dispatch({
        type: type.changePasswordFailure,
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

      dispatch({ type: type.uploadPhotoRequest });
      const response = await natoursApi.patch('/users/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({
        type: type.uploadPhotoSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your photo has been updated successfully');
    } catch (error) {
      dispatch({
        type: type.uploadPhotoFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const updateUserData = data => {
  return async dispatch => {
    try {
      dispatch({ type: type.updateUserDataRequest });
      const response = await natoursApi.patch('/users/updateMe', data);
      dispatch({
        type: type.updateUserDataSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your profile has been updated successfully');
    } catch (error) {
      dispatch({
        type: type.updateUserDataFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const updateUserPassword = data => {
  return async dispatch => {
    try {
      dispatch({ type: type.updateUserPasswordRequest });
      const response = await natoursApi.patch('/users/updatePassword', data);
      dispatch({
        type: type.updateUserPasswordSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your password has been updated successfully');
    } catch (error) {
      dispatch({
        type: type.updateUserPasswordFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const deleteUser = id => {
  return async dispatch => {
    try {
      dispatch({ type: type.deleteUserRequest });
      await natoursApi.delete(`/users/${id}`);
      dispatch({
        type: type.deleteUserSuccess
      });
      toastr.success('Success', 'User deleted successfully');
    } catch (error) {
      dispatch({
        type: type.deleteUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};

export const addUser = data => {
  return async dispatch => {
    try {
      dispatch({ type: type.addUserRequest });
      await natoursApi.post('/users/', data);
      dispatch({
        type: type.addUserSuccess
      });
      toastr.success('Success', 'User has been created successfully');
    } catch (error) {
      dispatch({
        type: type.addUserFailure,
        payload: error.response.data.message
      });
      toastr.error('Error', error.response.data.message);
    }
  };
};
