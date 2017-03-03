import DefaultState from '../DefaultState'

export function searchParamsReducer(state=DefaultState.searchParams, {type, payload}) {
    switch(type) {
        case 'SEARCH_KEYDOWN':
            return {
                inputValue: payload.inputValue
            }
        case 'LOAD_SEARCH_RESULTS':
            return {
                results: payload.res
            }
        default:
            return state
    }
}