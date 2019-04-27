import axios from 'axios';
import {
    SITE_GET_TEAMS,
    SITE_GET_TEAM_BY_SLUG,
    SITE_GET_RACES,
    SITE_GET_DRIVERS_LIST
} from './types';
import { SITE_SERVER } from '../../components/utils/misc';


export function getDriversList() {
    const request = axios.get(`${SITE_SERVER}/drivers-list`).then((response) => response.data);

    return {
        type: SITE_GET_DRIVERS_LIST,
        payload: request
    };
};

export function getTeams() {
    const request = axios.get(`${SITE_SERVER}/teams`).then((response) => response.data);

    return {
        type: SITE_GET_TEAMS,
        payload: request
    };
};

export function getTeamBySlug(slug) {
    const request = axios.get(`${SITE_SERVER}/team?slug=${slug}`).then((response) => response.data);

    return {
        type: SITE_GET_TEAM_BY_SLUG,
        payload: request
    };
};

export function getRaces() {
    const request = axios.get(`${SITE_SERVER}/races`).then((response) => response.data);

    return {
        type: SITE_GET_RACES,
        payload: request
    };
};