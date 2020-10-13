import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebaseConfig from '../../config';

export const authSuccess = ({ localId, idToken }) => {
  return { type: actionTypes.AUTH_SUCCESS, userId: localId, idToken: idToken }
};

export const authFailure = (err) => {
  return { type: actionTypes.AUTH_FAILURE, error: err }
};

export const authStart = () => {
  return { type: actionTypes.AUTH_START }
};

export const logOut = () => {
  return { type: actionTypes.AUTH_LOG_OUT }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return { type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path }
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    let signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    let signInURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    axios.post(`${isSignUp ? signUpURL : signInURL}${firebaseConfig.api_key}`, authData)
      .then(({ data }) => {
        dispatch(authSuccess(data));
        dispatch(checkAuthTimeout(data.expiresIn));
      })
      .catch(err => {
        dispatch(authFailure(err.response.data.error));
      })
  };
};