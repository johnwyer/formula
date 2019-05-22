import {
    REGISTER_USER,
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../actions/admin/types';

export default function(state = {}, action) {
    //console.log('user reducer ', action.payload);
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                register: action.payload
            };
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload
            };
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state
            };
        default:
            return state;
    }
}