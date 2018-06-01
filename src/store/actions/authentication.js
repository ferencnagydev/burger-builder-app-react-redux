import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authenticationStart = () => {
    return {
        type: actionTypes.AUTHENTICATION_START
    };
};

export const authenticationSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authenticationFailed = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    };
};

export const checkAuthenticationTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authenticate = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authenticationStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAprvQ2NqW1cJKbZg9PNKDf4bts-99-HnQ';

        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAprvQ2NqW1cJKbZg9PNKDf4bts-99-HnQ'
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authenticationSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthenticationTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authenticationFailed(error.response.data.error));
            })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTHENTICATION_SET_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthenticationState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authenticationSuccess(token, userId));
                dispatch(checkAuthenticationTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    };
};