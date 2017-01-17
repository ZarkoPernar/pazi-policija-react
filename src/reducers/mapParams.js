import DEFAULT_STATE from '../DefaultState'
import types from '../types/map'

export default function mapParamsReducer(state=DEFAULT_STATE.mapParams, {type, payload}) {
    switch(type) {
        case types.CENTER_ON_ME:
        return Object.assign({}, state, payload)

        default:
        return state
    }
}