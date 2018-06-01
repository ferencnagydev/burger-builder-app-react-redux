import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authenticationStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authenticationSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authenticationFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
}

const authenticationLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_START:
            return authenticationStart(state, action);

        case actionTypes.AUTHENTICATION_SUCCESS:
            return authenticationSuccess(state, action);

        case actionTypes.AUTHENTICATION_FAILED:
            return authenticationFail(state, action);
            
        case actionTypes.AUTHENTICATION_LOGOUT:
            return authenticationLogout(state, action);

        case actionTypes.AUTHENTICATION_SET_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
            
        default:
            return state;
    }
}

export default reducer;