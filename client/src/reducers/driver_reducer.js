import {
    ADD_DRIVER,
    GET_DRIVERS,
    UPDATE_DRIVER,
    GET_DRIVER_BY_ID,
    DELETE_DRIVER,
    GET_OPTION_COUNTRIES
} from '../actions/admin/types';

export default function(state = {}, action) {
    //console.log('driver reducer ', action.payload);
    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                drivers: action.payload
            };
        case ADD_DRIVER:
            return {
                ...state,
                addDriver: action.payload
            };
        case GET_DRIVER_BY_ID:
            return {
                ...state,
                drivers: action.payload
            };
        case UPDATE_DRIVER:
            return {
                ...state,
                editDriver: action.payload.success,
                drivers: action.payload.driver
            };
        case DELETE_DRIVER:
            return {
                ...state,
                drivers: action.payload
            };
        case GET_OPTION_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        default:
            return state;
    }
};