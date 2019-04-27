import {
    SITE_GET_TEAMS,
    SITE_GET_TEAM_BY_SLUG,
    SITE_GET_RACES,
    SITE_GET_DRIVERS_LIST
} from '../actions/site/types';

export default function(state = {}, action) {
    console.log('reducer ', action.payload);
    switch (action.type) {
        case SITE_GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            };
        case SITE_GET_TEAM_BY_SLUG:
            return {
                ...state,
                team: action.payload
            };
        case SITE_GET_RACES:
            return {
                ...state,
                races: action.payload
            };
        case SITE_GET_DRIVERS_LIST:
            return {
                ...state,
                driversList: action.payload
            };
        default:
            return state;
    }
};