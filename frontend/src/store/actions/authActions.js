import * as constants from '../constants/authConstants';
import * as authApi from '../apis/auth';

export const login = (email, password, callback) => async (dispatch) => {
  try {
    dispatch({ type: constants.AUTH_LOGIN_REQUEST });

    const { data } = await authApi.login(email, password);

    if (data.status === 'success') {
      localStorage.setItem('authInfo', JSON.stringify(data.result));
      dispatch({ type: constants.AUTH_LOGIN_SUCCESS, payload: data.result });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: constants.AUTH_LOGIN_FAIL, payload: message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await authApi.logout();
    localStorage.removeItem('authInfo');

    dispatch({ type: constants.AUTH_LOGOUT });
  } catch (error) {
    // error
  }
};

export const register = (userData, callback) => async (dispatch) => {
  try {
    dispatch({ type: constants.AUTH_REGISTER_REQUEST });

    const { data } = await authApi.register(userData);

    if (data.status === 'success') {
      localStorage.setItem('authInfo', JSON.stringify(data.result));
      dispatch({ type: constants.AUTH_REGISTER_SUCCESS, payload: data.result });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: constants.AUTH_REGISTER_FAIL, payload: message });
  }
};

export const updateUserPassword = (userData, callback) => async (dispatch) => {
  try {
    dispatch({ type: constants.EDIT_USER_PASSWORD_REQUEST });

    const { data } = await authApi.updatePassword(userData);

    if (data.status === 'success') {
      dispatch({ type: constants.EDIT_USER_PASSWORD_SUCCESS });

      localStorage.removeItem('authInfo');
      dispatch({ type: constants.AUTH_LOGOUT });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: constants.EDIT_USER_PASSWORD_FAIL, payload: message });
  }
};
