import * as constants from '../constants/userConstants';
import * as userApi from '../apis/user';

export const createUser = (userData, callback) => async (dispatch) => {
  try {
    dispatch({ type: constants.CREATE_USER_REQUEST });

    const { data } = await userApi.createUser(userData);

    if (data.status === 'success') {
      dispatch({
        type: constants.CREATE_USER_SUCCESS,
        payload: data.result
      });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: constants.CREATE_USER_FAIL, payload: message });
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: constants.FETCH_USERS_REQUEST });

    const { data } = await userApi.fetchUsers();
    if (data.status === 'success') {
      dispatch({
        type: constants.FETCH_USERS_SUCCESS,
        payload: data.result
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: constants.FETCH_USERS_FAIL, payload: message });
  }
};

export const fetchUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.FETCH_USER_REQUEST });

    const { data } = await userApi.fetchUser(id);

    if (data.status === 'success') {
      dispatch({
        type: constants.FETCH_USER_SUCCESS,
        payload: data.result
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: constants.FETCH_USER_FAIL, payload: message });
  }
};

export const updateUser = (id, userData, callback) => async (dispatch) => {
  try {
    dispatch({ type: constants.EDIT_USER_REQUEST });

    const { data } = await userApi.updateUser(id, userData);

    if (data.status === 'success') {
      dispatch({ type: constants.EDIT_USER_SUCCESS, payload: data.result });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: constants.EDIT_USER_FAIL, payload: message });
  }
};

export const deleteUser = (id, callback) => async (dispatch) => {
  try {
    dispatch({ type: constants.DELETE_USER_REQUEST });

    const { data } = await userApi.deleteUser(id);

    if (data.status === 'success') {
      dispatch({
        type: constants.DELETE_USER_SUCCESS,
        payload: data.result
      });
      callback();
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: constants.DELETE_USER_FAIL, payload: message });
  }
};

export const fetchProfile = () => async (dispatch) => {
  try {
    dispatch({ type: constants.FETCH_USER_PROFILE_REQUEST });

    const { data } = await userApi.fetchProfile();

    if (data.status === 'success') {
      dispatch({
        type: constants.FETCH_USER_PROFILE_SUCCESS,
        payload: data.result
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: constants.FETCH_USER_PROFILE_FAIL, payload: message });
  }
};

export const updateProfile = (userData, callback) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: constants.EDIT_USER_PROFILE_REQUEST });

    const {
      auth: { authInfo }
    } = getState();

    const { data } = await userApi.updateProfile(userData);

    if (data.status === 'success') {
      dispatch({
        type: constants.EDIT_USER_PROFILE_SUCCESS,
        payload: data.result
      });
      callback();

      const { name, photo, email, role } = data.result;
      const modifiedAuthInfo = {
        token: authInfo.token,
        name,
        photo,
        email,
        role
      };
      localStorage.setItem('authInfo', JSON.stringify(modifiedAuthInfo));
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: constants.EDIT_USER_PROFILE_FAIL, payload: message });
  }
};
