import {
  LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  INITIALIZE_TOKEN,
} from '../actions/types';

import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
    console.log(e);
    return null;
  }
};

const setToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    console.log(e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      setToken(action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      removeToken();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case INITIALIZE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
