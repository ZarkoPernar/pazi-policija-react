export const GEO_LOCALSTORAGE_KEY = 'geolocation'

export function getGeolocationFromLocalstorage() {
    return JSON.parse(window.localStorage.getItem(GEO_LOCALSTORAGE_KEY))
}

export function stripDataFromGeoposition(geoPos) {
    // Geoposition object contains methods so data needs to be extracted from it manually
    return {
        coords: {
            latitude: geoPos.geometry.location.lat(),
            longitude: geoPos.geometry.location.lng(),
        }
    }
}

export function getGeoLocation() {
    if (navigator && navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    } else {
        Promise.reject('Geolocation not available')
    }
}