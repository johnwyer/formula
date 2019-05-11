import axios from 'axios';
import {
    SITE_GET_RESULTS,
    SITE_GET_RESULT_BY_SLUG,
    SITE_GET_DRIVER_STANDINGS_RESULTS
} from './types';
import { SITE_RESULT_SERVER } from '../../components/utils/misc';

export function getResults() {
    const request = axios.get(`${SITE_RESULT_SERVER}/results`).then((response) => response.data);

    return {
        type: SITE_GET_RESULTS,
        payload: request
    };
};

export function getResultBySlug(slug) {
    const request = axios.get(`${SITE_RESULT_SERVER}/result?slug=${slug}`).then((response) => response.data);

    return {
        type: SITE_GET_RESULT_BY_SLUG,
        payload: request
    };
};

export function getDriverStandings() {
    const request = axios.get(`${SITE_RESULT_SERVER}/drivers`).then((response) => response.data);

    return {
        type: SITE_GET_DRIVER_STANDINGS_RESULTS,
        payload: request
    };
};