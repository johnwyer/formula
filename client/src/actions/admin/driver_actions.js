import axios from 'axios';
import {
    ADD_DRIVER,
    GET_DRIVERS,
    GET_DRIVER_BY_ID,
    UPDATE_DRIVER,
    DELETE_DRIVER,
    GET_OPTION_COUNTRIES
} from './types';
import { DRIVER_SERVER, DATA_SERVER } from '../../components/utils/misc';

export function addDriver(dataToSubmit) {
    const request = axios.post(`${DRIVER_SERVER}/add`, dataToSubmit).then((response) => response.data);

    return {
        type: ADD_DRIVER,
        payload: request
    };
};

export function getDrivers() {
    const request = axios.get(`${DRIVER_SERVER}/drivers`).then((response) => response.data);

    return {
        type: GET_DRIVERS,
        payload: request
    };
};

export function getDriverById(id) {
    const request = axios.get(`${DRIVER_SERVER}/get-by-id?id=${id}`).then((response) => response.data);

    return {
        type: GET_DRIVER_BY_ID,
        payload: request
    };
};

export function deleteDriver(id) {
    const dataToSubmit = { id };
    const request = axios.post(`${DRIVER_SERVER}/delete`, dataToSubmit).then((response) => response.data);

    return {
        type: DELETE_DRIVER,
        payload: request
    };
};

export function updateDriver(dataToSubmit) {
    //console.log(dataToSubmit)
    const request = axios.post(`${DRIVER_SERVER}/update`, dataToSubmit).then((response) => response.data);
    //console.log(request);

    return {
        type: UPDATE_DRIVER,
        payload: request
    };
};

export function getDriverCountries() {
    const request = axios.get(`${DATA_SERVER}/option/countries`).then((response) => response.data);

    return {
        type: GET_OPTION_COUNTRIES,
        payload: request
    };
};