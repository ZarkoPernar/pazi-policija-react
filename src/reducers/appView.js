import DEFAULT_STATE from '../DefaultState'

export function activeViewReducer(state=DEFAULT_STATE.activeView, {type, payload}) {
    switch(type) {
        case 'CHANGE_APP_VIEW':
            return payload
        case 'SEARCH_NEAR_ME':
            return 'map'
        default:
            return state
    }
}

export function newLocationModalReducer(state=DEFAULT_STATE.newLocationModal, {type, payload}) {
    switch(type) {
        case 'TOGGLE_NEW_LOCATION_MODAL':
            return !state

        case 'SET_NEW_LOCATION_MODAL':
            return payload

        default:
            return state
    }
}