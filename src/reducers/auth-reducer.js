import { ActionTypes } from '../actions';

const AuthReducer = (state = { authenticated: false, message: '' }, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, {
        authenticated: true,
      });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, {
        authenticated: false,
      });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        message: action.message,
      });
    case ActionTypes.CLEAR_ERROR:
      return Object.assign({}, state, {
        message: '',
      });
    default:
      return state;
  }
};

export default AuthReducer;
