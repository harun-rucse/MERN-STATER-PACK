import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  EDIT_USER_PASSWORD_REQUEST,
  EDIT_USER_PASSWORD_SUCCESS,
  EDIT_USER_PASSWORD_FAIL
} from '../constants/authConstants';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { loading: true };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authInfo: action.payload
      };
    case AUTH_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_REGISTER_REQUEST:
      return { loading: true };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        authInfo: action.payload
      };
    case AUTH_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const passwordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_USER_PASSWORD_REQUEST:
      return { loading: true, error: false };
    case EDIT_USER_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: false };
    case EDIT_USER_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
