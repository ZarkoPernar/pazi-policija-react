import DEFAULT_STATE from '../DefaultState'

export default function selectedAutocompleteItemReducer(state=DEFAULT_STATE.selectedAutocompleteItem, {type, payload}) {
    switch(type) {
        case 'SELECT':
            return payload
        case 'ADD_ITEM':
            return null
        default:
            return state
    }
}