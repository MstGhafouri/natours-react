import * as types from '../../actions/types';

const INITIAL_STATE = {
  currentUser: null,
  bookings: []
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.loginUserSuccess:
    case types.confirmEmailSuccess:
    case types.changePasswordSuccess:
    case types.uploadPhotoSuccess:
    case types.updateUserDataSuccess:
    case types.updateUserPasswordSuccess:
      return { ...state, currentUser: action.payload };
    case types.fetchUserToursSuccess:
      return { ...state, bookings: action.payload };
    case types.logoutUserSuccess:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
