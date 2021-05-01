import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer, passwordChangeReducer } from './reducers/authReducers';
import { userReducer, userProfileReducer } from './reducers/userReducers';
import settingReducer from './reducers/settingReducers';

const reducer = combineReducers({
  auth: authReducer,
  userList: userReducer,
  userProfile: userProfileReducer,
  passwordChange: passwordChangeReducer,
  settings: settingReducer
});

const authInfoFromStorage = localStorage.getItem('authInfo')
  ? JSON.parse(localStorage.getItem('authInfo'))
  : null;
const settingFromStorage = localStorage.getItem('settings')
  ? JSON.parse(localStorage.getItem('settings'))
  : null;

const initialState = {
  auth: {
    authInfo: authInfoFromStorage
  },
  settings: {
    data: settingFromStorage
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
