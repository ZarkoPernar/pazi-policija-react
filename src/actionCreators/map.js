import types from '../types/map'
import AppStore from '../AppStore'
import { getGeoLocation } from '../common/geoLocation'
import { GEO_LOCALSTORAGE_KEY } from '../common/constants'

const USER_DENIED_GEO_CODE = 1
let lastLocation = {
    last: 0,
    res: null,
}

export function getCenterFromGeoposition(res) {
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
    // if in memory and recent enough use that data
    if (within(lastLocation.last)) {
        AppStore.dispatch(getCenterFromGeoposition(lastLocation.res))
    }

    // else get fresh location data
    getGeoLocation().then((res) => {
        // save { coords: {} } to local storage
        window.localStorage.setItem(GEO_LOCALSTORAGE_KEY, JSON.stringify({
            coords: {
                latitude: res.coords.latitude, 
                longitude: res.coords.longitude
            }
        }))
        // then dispatch
        AppStore.dispatch(getCenterFromGeoposition(res))
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

