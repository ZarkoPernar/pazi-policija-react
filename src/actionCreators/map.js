import types from '../types/map'
import AppStore from '../AppStore'

const USER_DENIED_GEO_CODE = 1
let lastLocation = {
    last: 0,
    res: null,
}

export function center(res) {
    return {
        type: types.CENTER_ON_ME,
        payload: {
            center: {
                lat: res.coords.latitude,
                lng: res.coords.longitude,
            }
        }
        
    }
}

export function centerOnMe() {
    if (within(lastLocation.last)) {
        AppStore.dispatch(center(lastLocation.res))
    }

    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    }).then((res) => {
        AppStore.dispatch(center(res))
        return res
    }).catch((err) => {
        let msg = err.code === USER_DENIED_GEO_CODE ? 'You must enable location sharing' : 'Unable to get location'
        
        console.error(err)
        
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

function within(last) {
    return Date.now() - last <= 60000
}