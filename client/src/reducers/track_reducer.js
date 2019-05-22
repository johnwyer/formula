import {
    ADD_TRACK,
    GET_TRACKS,
    UPDATE_TRACK,
    GET_TRACK_BY_ID,
    DELETE_TRACK,
    GET_OPTION_COUNTRIES
} from '../actions/admin/types';

export default function(state = {}, action) {
    //console.log('track reducer ', action.payload);
    switch (action.type) {
        case GET_TRACKS:
            return {
                ...state,
                tracks: action.payload
            };
        case ADD_TRACK:
            return {
                ...state,
                addTrack: action.payload
            };
        case GET_TRACK_BY_ID:
            return {
                ...state,
                tracks: action.payload
            };
        case UPDATE_TRACK:
            return {
                ...state,
                editTrack: action.payload.success,
                tracks: action.payload.track
            };
        case DELETE_TRACK:
            return {
                ...state,
                tracks: action.payload
            };
        case GET_OPTION_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        default:
            return state;
    }
};