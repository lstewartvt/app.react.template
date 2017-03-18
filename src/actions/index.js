import cookie from 'react-cookie';
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

import {
  AUTHENTICATE_ERROR,
  AUTHENTICATED_USER,
  PROTECTED_TEST,
  UNAUTHENTICATED_USER
} from './types';

const API_URL = '';//'http://react.app.k0nrt15.com';

export function handleErrors(response, dispatch, type) {

  if (!response.ok || response.status >= 400) {
    if (response.status === 401) {
      dispatch({
        type: type,
        payload: 'You are not authorized to do this. Please login and try again.'
      });
      logout();
    } else {
      dispatch({
        type: type,
        payload: response.statusText
      });
    }

    throw new Error(response.statusText);
  }

  console.log(response);
  return response.json();
};

export function login({ email, password }) {
  return function(dispatch) {
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        handleErrors(response, dispatch, AUTHENTICATE_ERROR);
      })
      .then(function(data) {
        // cookie.save('token', data.token, { path: '/' });
        console.log('data:',data);
        dispatch({ type: AUTHENTICATED_USER });
        // window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch(error => console.log('error:',error));
  }
};

export function register({ email, handle, password }) {
  return function(dispatch) {
    fetch(`${API_URL}/auth/register`, {
        method: 'PUT',
        body: { email, handle, password }
      })
      .then(response => {
        handleErrors(response, dispatch, AUTHENTICATE_ERROR);
      })
      .then(data => {
        // cookie.save('token', data.token, { path: '/' });
        console.log(data);
        dispatch({ type: AUTHENTICATED_USER });
        // window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch(error => console.log(error));
  }
};

export function logout() {
  return function(dispatch) {
    dispatch({ type: UNAUTHENTICATED_USER });
    cookie.remove('token', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/login';
  }
};

export function protectedTest() {
  return function(dispatch) {
    fetch(`${API_URL}/protected`, {
        headers: { 'Authorization': cookie.load('token') }
      })
      .then(response => {
        handleErrors(response, dispatch, AUTHENTICATE_ERROR);
      })
      .then(data => {
        dispatch({
          type: PROTECTED_TEST,
          payload: data
        });
      })
      .catch(error => console.log(error));
  }
};
