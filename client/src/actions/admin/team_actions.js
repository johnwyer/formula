import axios from 'axios';
import {
    ADD_TEAM,
    GET_TEAMS,
    GET_TEAM_BY_ID,
    UPDATE_TEAM,
    DELETE_TEAM,
    GET_OPTION_COUNTRIES,
    GET_OPTION_DRIVERS
} from './types';
import { TEAM_SERVER, DATA_SERVER } from '../../components/utils/misc';

export function addTeam(dataToSubmit) {
    const request = axios.post(`${TEAM_SERVER}/add`, dataToSubmit).then((response) => response.data);

    return {
        type: ADD_TEAM,
        payload: request
    };
};

export function getTeams() {
    const request = axios.get(`${TEAM_SERVER}/teams`).then((response) => response.data);

    return {
        type: GET_TEAMS,
        payload: request
    };
};

export function getTeamById(id) {
    const request = axios.get(`${TEAM_SERVER}/get-by-id?id=${id}`).then((response) => response.data);

    return {
        type: GET_TEAM_BY_ID,
        payload: request
    };
};

export function deleteTeam(id) {
    const dataToSubmit = { id };
    const request = axios.post(`${TEAM_SERVER}/delete`, dataToSubmit).then((response) => response.data);

    return {
        type: DELETE_TEAM,
        payload: request
    };
};

export function updateTeam(dataToSubmit) {
    const request = axios.post(`${TEAM_SERVER}/update`, dataToSubmit).then((response) => response.data);

    return {
        type: UPDATE_TEAM,
        payload: request
    };
};

export function getTeamCountries() {
    const request = axios.get(`${DATA_SERVER}/option/countries`).then((response) => response.data);

    return {
        type: GET_OPTION_COUNTRIES,
        payload: request
    };
};

export function getTeamDrivers() {
    const request = axios.get(`${DATA_SERVER}/option/drivers`).then((response) => response.data);

    return {
        type: GET_OPTION_DRIVERS,
        payload: request
    };
};