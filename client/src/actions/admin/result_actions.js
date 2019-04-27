import axios from 'axios';
import {
    ADD_RESULT,
    GET_RESULT,
    UPDATE_RESULT,
    GET_RESULTS,
    GET_RESULT_TEMPLATE,
    GET_OPTION_DRIVERS,
    DELETE_RESULT
} from './types';
import { RESULT_SERVER, DATA_SERVER } from '../../components/utils/misc';

export function addResult(dataToSubmit) {
    const request = axios.post(`${RESULT_SERVER}/add`, dataToSubmit).then((response) => response.data);

    return {
        type: ADD_RESULT,
        payload: request
    };
};

export function updateResult(dataToSubmit) {
    const request = axios.post(`${RESULT_SERVER}/update`, dataToSubmit).then((response) => response.data);

    return {
        type: UPDATE_RESULT,
        payload: request
    };
};

export function getResult(id) {
    const request = axios.get(`${RESULT_SERVER}/get?id=${id}`).then((response) => response.data);

    return {
        type: GET_RESULT,
        payload: request
    };
};

export function getResults() {
    const request = axios.get(`${RESULT_SERVER}/results`).then((response) => response.data);

    return {
        type: GET_RESULTS,
        payload: request
    };
};

export function deleteResult(dataToSubmit) {
    const request = axios.post(`${RESULT_SERVER}/delete`, dataToSubmit).then((response) => response.data);

    return {
        type: DELETE_RESULT,
        payload: request
    };
};

export function getDrivers() {
    const request = axios.get(`${DATA_SERVER}/option/drivers`).then((response) => response.data);

    return {
        type: GET_OPTION_DRIVERS,
        payload: request
    };
};

export function getResultTemplate(id) {
    const request = axios.get(`${DATA_SERVER}/option/result?id=${id}`).then((response) => response.data);

    return {
        type: GET_RESULT_TEMPLATE,
        payload: request
    };
}