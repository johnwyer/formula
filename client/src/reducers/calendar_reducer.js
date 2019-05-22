import {
    ADD_RACE,
    GET_RACES,
    UPDATE_RACE,
    GET_RACE_BY_ID,
    DELETE_RACE,
    GET_OPTION_COUNTRIES,
    GET_OPTION_TRACKS
} from '../actions/admin/types';

export default function(state = {}, action) {
    //console.log('calendar reducer ', action.payload);
    switch (action.type) {
        case GET_RACES:
            return {
                ...state,
                races: action.payload
            };
        case ADD_RACE:
            return {
                ...state,
                addRace: action.payload
            };
        case GET_RACE_BY_ID:
            return {
                ...state,
                races: action.payload
            };
        case UPDATE_RACE:
            return {
                ...state,
                editRace: action.payload.success,
                races: action.payload.driver
            };
        case DELETE_RACE:
            return {
                ...state,
                races: action.payload
            };
        case GET_OPTION_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        case GET_OPTION_TRACKS:
            return {
                ...state,
                tracks: action.payload
            };
        default:
            return state;
    }
};