import reducer from './authentication';
import * as actionTypes from '../actions/actionTypes';

describe('authentication redux reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the authentication token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, 
        { 
            type: actionTypes.AUTHENTICATION_SUCCESS,
            idToken: 'testToken',
            userId: 'testUserId'
        })).toEqual({
            token: 'testToken',
            userId: 'testUserId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

});