import * as constants from '../constants/settingConstants';

const settingReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_SETTING_REQUEST:
      return { loading: true, error: false };
    case constants.FETCH_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case constants.FETCH_SETTING_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.CREATE_SETTING_REQUEST:
      return { ...state, loading: true, error: false };
    case constants.CREATE_SETTING_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false };
    case constants.CREATE_SETTING_FAIL:
      return { ...state, loading: false, error: action.payload };

    case constants.EDIT_SETTING_REQUEST:
      return { ...state, loading: true, error: false };
    case constants.EDIT_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case constants.EDIT_SETTING_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default settingReducer;
