import { loginUserSuccess, signUpUserSuccess } from '../../actions/types';

const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginUserSuccess:
    case signUpUserSuccess:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
