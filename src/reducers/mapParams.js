import DEFAULT_STATE from '../DefaultState'

export default function mapParamsReducer(state=DEFAULT_STATE.mapParams, {type, payload}) {
    switch(type) {
        case 'CHANGE':
        return Object.assign({}, state, payload)

        default:
        return state
    }
}