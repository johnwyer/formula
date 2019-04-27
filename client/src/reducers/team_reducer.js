import {
    ADD_TEAM,
    GET_TEAMS,
    UPDATE_TEAM,
    GET_TEAM_BY_ID,
    DELETE_TEAM,
    GET_OPTION_COUNTRIES,
    GET_OPTION_DRIVERS
} from '../actions/admin/types';

export default function(state = {}, action) {
    console.log('reducer ', action.payload);
    switch (action.type) {
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            };
        case ADD_TEAM:
            return {
                ...state,
                addTeam: action.payload
            };
        case GET_TEAM_BY_ID:
            return {
                ...state,
                teams: action.payload
            };
        case UPDATE_TEAM:
            return {
                ...state,
                editTeam: action.payload.success,
                teams: action.payload.team
            };
        case DELETE_TEAM:
            return {
                ...state,
                teams: action.payload
            };
        case GET_OPTION_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        case GET_OPTION_DRIVERS:
            return {
                ...state,
                drivers: action.payload
            };
        default:
            return state;
    }
};