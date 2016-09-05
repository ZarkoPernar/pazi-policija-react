let places
let lastReq
const service = {
    init(map) {
        places = new google.maps.places.PlacesService(map)
    },
    search(params) {
        lastReq = Date.now()

        return new Promise(function(resolve, reject) {
            setTimeout(function(oldReq) {
                if (lastReq === oldReq) {
                    places.textSearch(params, resolve)
                }
            }, 500, lastReq)
        })
    }
}

export default service
