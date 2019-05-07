import axios from 'axios';
import {
    SITE_GET_RACES,
    SITE_GET_TEAMS_DRIVERS,
    SITE_GET_RACE_BY_SLUG
} from './types';
import { SITE_CALENDAR_SERVER } from '../../components/utils/misc';

export function getTeamsDrivers() {
    const request = axios.get(`${SITE_CALENDAR_SERVER}/teams-drivers`).then((response) => response.data);

    return {
        type: SITE_GET_TEAMS_DRIVERS,
        payload: request
    };
};

export function getRaces() {
    const request = axios.get(`${SITE_CALENDAR_SERVER}/races`).then((response) => response.data);

    return {
        type: SITE_GET_RACES,
        payload: request
    };
};

export function getRaceBySlug(slug) {
    const request = axios.get(`${SITE_CALENDAR_SERVER}/race?slug=${slug}`).then((response) => response.data);

    return {
        type: SITE_GET_RACE_BY_SLUG,
        payload: request
    };
};