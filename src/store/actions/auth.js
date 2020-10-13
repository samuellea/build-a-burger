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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
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
      // ---------------------------------
      .then(({ data }) => {
        const expirationDate = new Date(new Date().getTime() + (data.expiresIn * 1000))
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', data.localId);
        // ---------------------------------
        dispatch(authSuccess(data));
        dispatch(checkAuthTimeout(data.expiresIn));
      })
      .catch(err => {
        dispatch(authFailure(err.response.data.error));
      })
  };
};

// each time the application loads in the browser, check whether our user can remain logged in, or will need to sign in again,
// based on previously-saved values stored in localStorage, which may or may not exist / be valid.
// called in top-level App component's componentDidMount (ie. every time browser is refreshed and thus, the app loads)
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) { // don't have a token at all
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const persistentUserId = localStorage.getItem('userId');
      if (expirationDate <= new Date()) { // HAD a valid token, but it has since expired
        dispatch(logOut());
      } else { // HAD a valid token, AND the current time is still less than the expirationDate
        dispatch(authSuccess({ localId: persistentUserId, idToken: token }))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  };
}