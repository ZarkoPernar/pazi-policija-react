const GEO_LOCALSTORAGE_KEY = 'geolocation'

export function getGeolocationFromLocalstorage() {
    return JSON.parse(window.localStorage.getItem(GEO_LOCALSTORAGE_KEY))
}

export function saveGeolocationToLocalstorage(res) {   
    window.localStorage.setItem(GEO_LOCALSTORAGE_KEY, JSON.stringify(stripDataFromGeoposition(res)))
}

export function stripDataFromGeoposition(geoPos) {
    // Geoposition object contains methods so data needs to be extracted from it manually
    return {
        coords: {
            latitude: geoPos.coords.latitude,
            longitude: geoPos.coords.longitude,
        }
    }
}

export function getGeoLocation() {
    if (navigator && navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        .then((res) => {
            saveGeolocationToLocalstorage(res)
            return res
        })
    } else {
        Promise.reject('Geolocation not available')
    }
}

