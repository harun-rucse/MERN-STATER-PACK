import _ from 'lodash';
import * as constants from '../constants/userConstants';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_USERS_REQUEST:
      return { loading: true, error: false };
    case constants.FETCH_USERS_SUCCESS:
      return {
        loading: false,
        data: { ..._.mapKeys(action.payload, '_id') },
        error: false
      };
    case constants.FETCH_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.CREATE_USER_REQUEST:
      return { ...state, loading: true, error: false };
    case constants.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, [action.payload._id]: action.payload },
        error: false
      };
    case constants.CREATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.FETCH_USER_REQUEST:
      return { ...state, loading: true, error: false };
    case constants.FETCH_USER_SUCCESS:
      return {
        loading: false,
        data: { ...state.data, [action.payload._id]: action.payload },
        error: false
      };
    case constants.FETCH_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.EDIT_USER_REQUEST:
      return { ...state, loading: true, error: false };
    case constants.EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, [action.payload._id]: action.payload },
        error: false
      };
    case constants.EDIT_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.DELETE_USER_REQUEST:
      return { ...state, loading: true, error: false };
    case constants.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ..._.omit(state.data, action.payload) },
        error: false
      };
    case constants.DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_USER_PROFILE_REQUEST:
      return { loading: true, error: false };
    case constants.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case constants.FETCH_USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.EDIT_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: false };
    case constants.EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case constants.EDIT_USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
