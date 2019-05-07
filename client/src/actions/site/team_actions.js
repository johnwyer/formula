import axios from 'axios';
import {
    SITE_GET_TEAMS,
    SITE_GET_TEAM_BY_SLUG
} from './types';
import { SITE_TEAM_SERVER } from '../../components/utils/misc';

export function getTeams() {
    const request = axios.get(`${SITE_TEAM_SERVER}/teams`).then((response) => response.data);

    return {
        type: SITE_GET_TEAMS,
        payload: request
    };
};

export function getTeamBySlug(slug) {
    const request = axios.get(`${SITE_TEAM_SERVER}/team?slug=${slug}`).then((response) => response.data);

    return {
        type: SITE_GET_TEAM_BY_SLUG,
        payload: request
    };
};