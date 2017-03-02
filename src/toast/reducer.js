import DefaultState from '../DefaultState'

export function toastsReducer(state=DefaultState.toasts, {type, payload}) {
    switch(type) {
        case 'ADD_TOAST':
            return state.concat([payload])
        case 'ADD_ITEM':
            return [...state, {
                duration: 3000,
                description: 'You have successufully added a new location!',
            }]
        case 'DISMISS_TOAST':
            return state.map((tst) => {
                if (tst === payload) {
                    return Object.assign({}, tst, {
                        closed: true
                    })
                }
                return tst
            })
        default:
            return state
    }
}