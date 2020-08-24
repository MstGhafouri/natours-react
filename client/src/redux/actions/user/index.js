import { toastr } from 'react-redux-toastr';

import { persistor } from '../../store';
import natoursApi from '../../../api/natoursApi';
import errorHandler from '../errorHandler';
import history from '../../../history';
import * as types from '../types';

export const signup = data => {
  return async dispatch => {
    try {
      dispatch({ type: types.signUpUserRequest });
      const response = await natoursApi.post('/users/signup', data);
      dispatch({
        type: types.signUpUserSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your registration was successful');
      history.push('/me/settings');
    } catch (error) {
      errorHandler(error, dispatch, types.signUpUserFailure);
    }
  };
};

export const login = data => {
  return async dispatch => {
    try {
      dispatch({ type: types.loginUserRequest });
      const response = await natoursApi.post('/users/login', data);
      dispatch({
        type: types.loginUserSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Logged in successfully');
      history.push('/me/settings');
    } catch (error) {
      errorHandler(error, dispatch, types.loginUserFailure);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      dispatch({ type: types.logoutUserRequest });
      await natoursApi.get('/users/logout');
      dispatch({
        type: types.logoutUserSuccess
      });
      persistor.purge();
      history.push('/');
    } catch (error) {
      errorHandler(error, dispatch, types.logoutUserFailure);
    }
  };
};

export const resetUserPassword = data => {
  return async dispatch => {
    try {
      dispatch({ type: types.resetPasswordRequest });
      await natoursApi.post('/users/forgotPassword', data);
      dispatch({
        type: types.resetPasswordSuccess
      });
      toastr.info(
        'Email sent!',
        'Check your email for a link to reset your password'
      );
    } catch (error) {
      errorHandler(error, dispatch, types.resetPasswordFailure);
    }
  };
};

export const changeUserPassword = (data, token) => {
  return async dispatch => {
    try {
      dispatch({ type: types.changePasswordRequest });
      const response = await natoursApi.patch(
        `/users/resetPassword/${token}`,
        data
      );
      dispatch({
        type: types.changePasswordSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your password has been changed successfully');
    } catch (error) {
      errorHandler(error, dispatch, types.changePasswordFailure);
    }
  };
};

export const uploadUserPhoto = file => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      dispatch({ type: types.uploadPhotoRequest });
      const response = await natoursApi.patch('/users/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({
        type: types.uploadPhotoSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your photo has been updated successfully');
    } catch (error) {
      errorHandler(error, dispatch, types.uploadPhotoFailure);
    }
  };
};

export const updateUserData = data => {
  return async dispatch => {
    try {
      dispatch({ type: types.updateUserDataRequest });
      const response = await natoursApi.patch('/users/updateMe', data);
      dispatch({
        type: types.updateUserDataSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your profile has been updated successfully');
    } catch (error) {
      errorHandler(error, dispatch, types.updateUserDataFailure);
    }
  };
};

export const updateUserPassword = data => {
  return async dispatch => {
    try {
      dispatch({ type: types.updateUserPasswordRequest });
      const response = await natoursApi.patch('/users/updatePassword', data);
      dispatch({
        type: types.updateUserPasswordSuccess,
        payload: response.data.data.user
      });
      toastr.success('Success', 'Your password has been updated successfully');
    } catch (error) {
      errorHandler(error, dispatch, types.updateUserPasswordFailure);
    }
  };
};

export const deleteUser = id => {
  return async dispatch => {
    try {
      dispatch({ type: types.deleteUserRequest });
      await natoursApi.delete(`/users/${id}`);
      dispatch({
        type: types.deleteUserSuccess
      });
      toastr.success('Success', 'User deleted successfully');
    } catch (error) {
      errorHandler(error, dispatch, types.deleteUserFailure);
    }
  };
};

export const addUser = data => {
  return async dispatch => {
    try {
      dispatch({ type: types.addUserRequest });
      await natoursApi.post('/users/', data);
      dispatch({
        type: types.addUserSuccess
      });
      toastr.success('Success', 'User has been created successfully');
    } catch (error) {
      errorHandler(error, dispatch, types.addUserFailure);
    }
  };
};

export const fetchUserTours = () => {
  return async dispatch => {
    try {
      dispatch({ type: types.fetchUserToursRequest });
      const response = await natoursApi.get('/users/my-tours');
      dispatch({
        type: types.fetchUserToursSuccess,
        payload: response.data.data.tours
      });
    } catch (error) {
      errorHandler(error, dispatch, types.fetchUserToursFailure);
    }
  };
};
