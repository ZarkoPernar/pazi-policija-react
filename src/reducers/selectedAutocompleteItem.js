import DEFAULT_STATE from '../DefaultState'

export default function selectedAutocompleteItemReducer(state=DEFAULT_STATE.selectedAutocompleteItem, {type, payload}) {
    switch(type) {
        case 'SELECT':
            return payload

        default:
            return state
    }
}