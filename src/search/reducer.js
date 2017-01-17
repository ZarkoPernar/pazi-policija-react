import DefaultState from '../DefaultState'

export function searchParamsReducer(state=DefaultState.searchParams, {type, payload}) {
    switch(type) {
        case 'SEARCH_KEYDOWN':
            return {
                inputValue: payload.inputValue
            }
        default:
            return state
    }
}