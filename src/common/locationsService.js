module.exports = service()

function service() {
    return {
        /**
         * listAll	returns all locations
         * @return {[location]}
         */
        listAll(params) {
            return fetch('/api/locations/near', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    lat: params.lat,
                    lng: params.lng,
                    rad: params.rad,
                })
            })
        },
        addLocation(location) {
            return fetch('/api/locations/add', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(location)
            })
        },
        updateLocation(location) {
            return fetch('/api/locations/update', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(location)
            })
        },
    }
}
