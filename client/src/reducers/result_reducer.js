import {
    ADD_RESULT,
    GET_RESULT,
    UPDATE_RESULT,
    GET_RESULTS,
    GET_RESULT_TEMPLATE,
    GET_OPTION_DRIVERS,
    DELETE_RESULT
} from '../actions/admin/types';

export default function(state = {}, action) {
    //console.log('result reducer ', action.payload);
    switch (action.type) {
        case ADD_RESULT:
            return {
                ...state,
                addResult: action.payload
            };
        case GET_RESULTS:
            return {
                ...state,
                results: action.payload
            };
        case GET_RESULT:
            return {
                ...state,
                result: action.payload
            };
        case UPDATE_RESULT:
            return {
                ...state,
                editResult: action.payload.success,
                result: action.payload.result
            };
        case GET_RESULT_TEMPLATE:
            return {
                ...state,
                result: action.payload
            };
        case GET_OPTION_DRIVERS:
            return {
                ...state,
                drivers: action.payload
            };
        case DELETE_RESULT:
            return {
                ...state,
                results: action.payload
            };
        default:
            return state;
    }
};