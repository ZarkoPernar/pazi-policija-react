import DefaultState from '../DefaultState'
import types from '../types/waitForMapClick'

export default function waitForMapClickReducer(state=DefaultState.waitForMapClick, {type, payload}) {
    switch(type) {
        case types.TOGGLE_WAIT_FOR_MAP_CLICK:
            return !state

        case types.SET_WAIT_FOR_MAP_CLICK:
            return payload
            
        default:
            return state
    }
}