export function changeView(viewName) {
    return {
        type: 'CHANGE_APP_VIEW',
        payload: viewName
    }
}