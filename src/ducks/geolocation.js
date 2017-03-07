const SET_LOCATION = 'geolocation/SET_LOCATION'
const GET_LOCATION_ERROR = 'geolocation/GET_LOCATION_ERROR'

const initialState = {
    coords: {},
    lastCaptured: 0,
    enabled: false,
}

export default function reducer(state=initialState, {type, payload}) {
    switch (type) {
        case SET_LOCATION:
            return {
                enabled: true,
                lastCaptured: Date.now(),
                coords: payload.coords
            }

        case GET_LOCATION_ERROR:
            return {
                ...state,
                enabled: false,
            }

        default:
            return state
    }
}

export function error() {
    return {
        type: GET_LOCATION_ERROR,
    }
}

export function setLocation({ coords }) {
    return {
        type: SET_LOCATION,
        payload: {
            coords
        }
    }
}