import axios from 'axios';
import {
    SITE_GET_DRIVERS,
    SITE_GET_DRIVER_BY_SLUG
} from './types';
import { SITE_DRIVER_SERVER } from '../../components/utils/misc';

export function getDrivers() {
    const request = axios.get(`${SITE_DRIVER_SERVER}/drivers`).then((response) => response.data);

    return {
        type: SITE_GET_DRIVERS,
        payload: request
    };
};

export function getDriverBySlug(slug) {
    const request = axios.get(`${SITE_DRIVER_SERVER}/driver?slug=${slug}`).then((response) => response.data);

    return {
        type: SITE_GET_DRIVER_BY_SLUG,
        payload: request
    };
};