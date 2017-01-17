import DEFAULT_STATE from '../DefaultState'
import mapTypes from '../types/map'
export function activeViewReducer(state=DEFAULT_STATE.activeView, {type, payload}) {
    switch(type) {
        case 'CHANGE_APP_VIEW':
            return payload
        case 'SEARCH_NEAR_ME':
            return 'map'

        case 'ADD_LOCATION':
            return 'list'

        case mapTypes.CENTER_ON_ME:
            return state === 'list' ? 'list' : 'map'
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