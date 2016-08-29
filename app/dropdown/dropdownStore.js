import {createStore} from 'redux'

const dropdownReducer = (state, action) => {
    state = state || {
        isOpen: false,
        active: null,
    }
    switch (action.type) {
        case 'DROPDOWN_TOGGLE':
            state = Object.assign({}, state, {
                isOpen: !state.isOpen
            })
            break;
        case 'DROPDOWN_OPTION_SELECT':
            state = Object.assign({}, state, {
                active: action.active,
                isOpen: false,
            })
            break;
        default:
            return state
    }
}

const store = createStore(dropdownReducer)

export default store
