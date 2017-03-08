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

export function modalsReducer(state=DEFAULT_STATE.modals, {type, payload}) {
    switch(type) {
        case 'TOGGLE_MODAL':
            let prevVal = state[payload]
            return {
                ...state,
                [payload]: !prevVal
            }

        case 'SET_MODAL':
            return {
                ...state,
                [payload.name]: payload.value
            }

        default:
            return state
    }
}