import axios from 'axios';
import {
    ADD_TRACK,
    GET_TRACKS,
    GET_TRACK_BY_ID,
    UPDATE_TRACK,
    DELETE_TRACK,
    GET_OPTION_COUNTRIES
} from './types';
import { TRACK_SERVER, DATA_SERVER } from '../../components/utils/misc';

export function addTrack(dataToSubmit) {
    const request = axios.post(`${TRACK_SERVER}/add`, dataToSubmit).then((response) => response.data);

    return {
        type: ADD_TRACK,
        payload: request
    };
};

export function getTracks() {
    const request = axios.get(`${TRACK_SERVER}/tracks`).then((response) => response.data);

    return {
        type: GET_TRACKS,
        payload: request
    };
};

export function getTrackById(id) {
    const request = axios.get(`${TRACK_SERVER}/get-by-id?id=${id}`).then((response) => response.data);

    return {
        type: GET_TRACK_BY_ID,
        payload: request
    };
};

export function deleteTrack(id) {
    const dataToSubmit = { id };
    const request = axios.post(`${TRACK_SERVER}/delete`, dataToSubmit).then((response) => response.data);

    return {
        type: DELETE_TRACK,
        payload: request
    };
};

export function updateTrack(dataToSubmit) {
    const request = axios.post(`${TRACK_SERVER}/update`, dataToSubmit).then((response) => response.data);

    return {
        type: UPDATE_TRACK,
        payload: request
    };
};

export function getTrackCountries() {
    const request = axios.get(`${DATA_SERVER}/option/countries`).then((response) => response.data);

    return {
        type: GET_OPTION_COUNTRIES,
        payload: request
    };
};