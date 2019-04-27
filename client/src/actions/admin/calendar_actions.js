import axios from 'axios';
import {
    ADD_RACE,
    GET_RACES,
    GET_RACE_BY_ID,
    UPDATE_RACE,
    DELETE_RACE,
    GET_OPTION_COUNTRIES,
    GET_OPTION_TRACKS
} from './types';
import { CALENDAR_SERVER, DATA_SERVER } from '../../components/utils/misc';

export function addRace(dataToSubmit) {
    const request = axios.post(`${CALENDAR_SERVER}/add`, dataToSubmit).then((response) => response.data);

    return {
        type: ADD_RACE,
        payload: request
    };
};

export function getRaces() {
    const request = axios.get(`${CALENDAR_SERVER}/races`).then((response) => response.data);

    return {
        type: GET_RACES,
        payload: request
    };
};

export function getRaceById(id) {
    const request = axios.get(`${CALENDAR_SERVER}/get-by-id?id=${id}`).then((response) => response.data);

    return {
        type: GET_RACE_BY_ID,
        payload: request
    };
};

export function deleteRace(id) {
    const dataToSubmit = { id };
    const request = axios.post(`${CALENDAR_SERVER}/delete`, dataToSubmit).then((response) => response.data);

    return {
        type: DELETE_RACE,
        payload: request
    };
};

export function updateRace(dataToSubmit) {
    //console.log(dataToSubmit)
    const request = axios.post(`${CALENDAR_SERVER}/update`, dataToSubmit).then((response) => response.data);
    //console.log(request);

    return {
        type: UPDATE_RACE,
        payload: request
    };
};

export function getRaceCountries() {
    const request = axios.get(`${DATA_SERVER}/option/countries`).then((response) => response.data);

    return {
        type: GET_OPTION_COUNTRIES,
        payload: request
    };
};

export function getRaceTracks() {
    const request = axios.get(`${DATA_SERVER}/option/tracks`).then((response) => response.data);

    return {
        type: GET_OPTION_TRACKS,
        payload: request
    };
};