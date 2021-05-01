import * as constants from '../constants/settingConstants';
import * as settingApi from '../apis/settings';

export const createSetting = (settingData, callback) => async (dispatch) => {
  try {
    dispatch({ type: constants.CREATE_SETTING_REQUEST });

    const { data } = await settingApi.createSetting(settingData);

    if (data.status === 'success') {
      localStorage.setItem('settings', JSON.stringify(data.result));
      dispatch({
        type: constants.CREATE_SETTING_SUCCESS,
        payload: data.result
      });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: constants.CREATE_SETTING_FAIL, payload: message });
  }
};

export const fetchSetting = () => async (dispatch) => {
  try {
    dispatch({ type: constants.FETCH_SETTING_REQUEST });

    const { data } = await settingApi.fetchSetting();
    if (data.status === 'success') {
      dispatch({
        type: constants.FETCH_SETTING_SUCCESS,
        payload: data.result[0]
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: constants.FETCH_SETTING_FAIL, payload: message });
  }
};

export const updateSetting = (id, settingData, callback) => async (
  dispatch
) => {
  try {
    dispatch({ type: constants.EDIT_SETTING_REQUEST });

    const { data } = await settingApi.updateSetting(id, settingData);

    if (data.status === 'success') {
      localStorage.setItem('settings', JSON.stringify(data.result));
      dispatch({ type: constants.EDIT_SETTING_SUCCESS, payload: data.result });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: constants.EDIT_SETTING_FAIL, payload: message });
  }
};
