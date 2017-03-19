const app_data = require('app.data');

import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

import {
  AUTHENTICATE_ERROR,
  AUTHENTICATED_USER,
  PROTECTED_TEST,
  RESET_FORM,
  UNAUTHENTICATED_USER
} from './types';

const API_URL = ''; //'http://react.app.k0nrt15.com';

export function handleErrors(response, dispatch, type) {

  if (!response.ok || response.status >= 400) {
    if (response.status === 401) {
      dispatch({
        type: type,
        payload: 'You are not authorized to do this. Please login and try again.'
      });
      logout();
    }

    return response.json().then(data => {
      dispatch({
        type: AUTHENTICATE_ERROR,
        payload: data.message
      });
      throw new Error(data.message);
    });
  }

  return response.json();
};

export function login({ email, password }) {
  return function(dispatch) {
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        return handleErrors(response, dispatch, AUTHENTICATE_ERROR);
      })
      .then(data => {
        ReactCookie.save(app_data.auth.cookie_name, data.token, { 
          path: '/',
          secure: _secure
        });
        dispatch({ type: AUTHENTICATED_USER });
        ReactRouter.browserHistory.push(app_data.nav.home);
      })
      .catch(error => console.error(error.message));
  }
};

export function register({ email, handle, password }) {
  return function(dispatch) {
    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email,handle, password })
      })
      .then(response => {
        return handleErrors(response, dispatch, AUTHENTICATE_ERROR);
      })
      .then(data => {
        ReactCookie.save(app_data.auth.cookie_name, data.token, { path: '/' });
        dispatch({ type: AUTHENTICATED_USER });
        ReactRouter.browserHistory.push(app_data.nav.home);
      })
      .catch(error => console.log(error.message));
  }
};

export function logout() {
  return function(dispatch) {
    dispatch({ type: UNAUTHENTICATED_USER });
    ReactCookie.remove(app_data.auth.cookie_name, { path: '/' });
    ReactRouter.browserHistory.push(app_data.nav.login);
  }
};

export function protectedTest() {
  return function(dispatch) {
    fetch(`${API_URL}/protected`, {
        headers: { 'Authorization': ReactCookie.load(app_data.auth.cookie_name) }
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
      .catch(error => console.log(error.message));
  }
};

export function reset() {
  return function(dispatch) {
    console.log(RESET_FORM);
    dispatch({ type: RESET_FORM });
  }
};