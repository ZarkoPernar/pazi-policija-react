import types from '../types/map'
import AppStore from '../AppStore'

const USER_DENIED_GEO_CODE = 1

export function centerOnMe() {
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    }).then((res) => {
        AppStore.dispatch({
            type: types.CENTER_ON_ME,
            payload: {
                center: {
                    lat: res.coords.latitude,
                    lng: res.coords.longitude,
                }
            }
            
        })
        return res
    }).catch((err) => {
        let msg = err.code === USER_DENIED_GEO_CODE ? 'You must enable location sharing' : 'Unable to get location'
        AppStore.dispatch({
            type: 'ADD_TOAST',
            payload: {
                duration: 3000,
                description: msg,
            }
        })
        return err
    })
}