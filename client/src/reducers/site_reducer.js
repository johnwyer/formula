import {
    SITE_GET_TEAMS,
    SITE_GET_TEAM_BY_SLUG,
    SITE_GET_RACES,
    SITE_GET_DRIVERS_LIST,
    SITE_GET_TEAMS_DRIVERS,
    SITE_GET_RACE_BY_SLUG
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
        case SITE_GET_TEAMS_DRIVERS:
            return {
                ...state,
                teamsDrivers: action.payload
            };
        case SITE_GET_RACE_BY_SLUG:
            return {
                ...state,
                race: action.payload
            };
        default:
            return state;
    }
};