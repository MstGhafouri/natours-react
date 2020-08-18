import {
  loginUserSuccess,
  signUpUserSuccess,
  logoutUserSuccess,
  changePasswordSuccess,
  uploadPhotoSuccess
} from '../../actions/types';

const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginUserSuccess:
    case signUpUserSuccess:
    case changePasswordSuccess:
    case uploadPhotoSuccess:    
      return { ...state, currentUser: action.payload };
    case logoutUserSuccess:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
