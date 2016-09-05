import {createStore} from 'redux'

const defaultState = {
    isOpen: false,
    active: null,
}

const dropdownReducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'DROPDOWN_TOGGLE':
            return Object.assign({}, state, {
                isOpen: !state.isOpen
            })
        case 'DROPDOWN_OPTION_SELECT':
            return Object.assign({}, state, {
                active: action.active,
                isOpen: false,
            })
        default:
            return state
    }
}

const store = createStore(dropdownReducer, window.devToolsExtension && window.devToolsExtension())

export default store
