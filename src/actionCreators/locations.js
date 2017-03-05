export const ADD_ITEMS = 'ADD_ITEMS'

export function addItems(data) {
    return {
        type: ADD_ITEMS,
        payload: data
    }
}