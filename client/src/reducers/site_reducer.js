import {
    SITE_GET_TEAMS,
    SITE_GET_TEAM_BY_SLUG,
    SITE_GET_RACES,
    SITE_GET_RACE_BY_SLUG,
    SITE_GET_DRIVERS,
    SITE_GET_DRIVER_BY_SLUG,
    SITE_GET_RESULTS,
    SITE_GET_RESULT_BY_SLUG,
    SITE_GET_DRIVER_STANDINGS_RESULTS,
    SITE_GET_TEAM_STANDINGS_RESULTS,
    SITE_GET_LAST_RESULT
} from '../actions/site/types';

export default function(state = {}, action) {
    //console.log('site reducer ', action.payload);
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
        case SITE_GET_RACE_BY_SLUG:
            return {
                ...state,
                race: action.payload
            };
        case SITE_GET_DRIVERS:
            return {
                ...state,
                drivers: action.payload
            };
        case SITE_GET_DRIVER_BY_SLUG:
            return {
                ...state,
                driver: action.payload
            };
        case SITE_GET_RESULTS:
            return {
                ...state,
                results: action.payload
            };
        case SITE_GET_RESULT_BY_SLUG:
            return {
                ...state,
                result: action.payload
            };
        case SITE_GET_DRIVER_STANDINGS_RESULTS:
            return {
                ...state,
                driverStandings: action.payload
            };
        case SITE_GET_TEAM_STANDINGS_RESULTS:
            return {
                ...state,
                teamStandings: action.payload
            };
        case SITE_GET_LAST_RESULT:
            return {
                ...state,
                lastResult: action.payload
            };
        default:
            return state;
    }
};