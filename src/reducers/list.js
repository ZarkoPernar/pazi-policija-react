import DEFAULT_STATE from '../DefaultState'
import ListActions from '../locationsList/Actions'

export default function listReducer(state=DEFAULT_STATE.list, {type, payload}) {
    switch(type) {
        case ListActions.ADD_ITEM:
            if (state.find(item => payload._id === item._id)) {
                return state
            } else {
                return [payload, ...state]
            }

        case ListActions.ADD_ITEMS:
            return payload

        case ListActions.REMOVE_ITEM:
            return state.filter(item => payload !== item)

        default:
            return state
    }
}