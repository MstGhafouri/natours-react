import {
  loginUserSuccess,
  signUpUserSuccess,
  logoutUserSuccess
} from '../../actions/types';

const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginUserSuccess:
    case signUpUserSuccess:
      return { ...state, currentUser: action.payload };
    case logoutUserSuccess:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
