import axios from 'axios';
import {DOMAIN} from './domain';
import {returnErrors, createMessage} from './messages';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  INITIALIZE_TOKEN,
} from './types';
import {getToken} from '../reducers/auth';

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({type: USER_LOADING});

  getToken()
    .then(token => {
      dispatch({type: INITIALIZE_TOKEN, payload: token});
    })
    .finally(() => {
      axios
        .get(`${DOMAIN}/api/auth/user`, tokenConfig(getState))
        .then(res => {
          dispatch({
            type: USER_LOADED,
            payload: res.data,
          });
        })
        .catch(err => {
          dispatch({
            type: AUTH_ERROR,
          });
        });
    });
};

// login user
export const login = (email, password) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // request body
  const body = JSON.stringify({email, password});

  axios
    .post(`${DOMAIN}/api/auth/login`, body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(createMessage({login: 'Login successful'}));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// logout user
export const logout = () => (dispatch, getState) => {
  axios
    .post(`${DOMAIN}/api/auth/logout`, null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      dispatch(createMessage({logout: 'Logout successful'}));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const tokenConfig = getState => {
  // get token from state
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // if token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
