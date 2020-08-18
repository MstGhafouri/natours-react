import {
  loginUserSuccess,
  signUpUserSuccess,
  logoutUserSuccess,
  changePasswordSuccess
} from '../../actions/types';

const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginUserSuccess:
    case signUpUserSuccess:
    case changePasswordSuccess:  
      return { ...state, currentUser: action.payload };
    case logoutUserSuccess:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
