import { combineReducers } from 'redux'
import { uniqBy } from 'lodash'

import DEFAULT_STATE from './DefaultState'

import ListActions from './locationsList/Actions'

export default combineReducers({
    list: listReducer,
    selectedItem: selectedItemReducer,
    mapParams: mapParamsReducer,
})

function listReducer(state=DEFAULT_STATE.list, {type, payload}) {
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

function mapParamsReducer(state=DEFAULT_STATE.mapParams, {type, payload}) {
    switch(type) {
        case 'CHANGE':
        return Object.assign({}, state, payload)

        default:
        return state
    }
}

function selectedItemReducer(state=DEFAULT_STATE.selectedItem, action) {
    return state
}
