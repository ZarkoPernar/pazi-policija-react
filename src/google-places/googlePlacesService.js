let places
let autoService

let lastReq
const service = {
    init(map) {
        places = new google.maps.places.PlacesService(map)
        autoService = new google.maps.places.AutocompleteService()
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
    },

    getDetails(item) {
        return new Promise(function(resolve, reject) {
            places.getDetails({
                reference: item.reference
            }, function(res) {
                resolve(res)
            })
        })
    },

    auto({ input }) {
        return new Promise(function(resolve, reject) {
            autoService.getPlacePredictions({
                componentRestrictions: {country: 'hr'},
                input
            }, function(predictions, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    return reject(status)
                }

                resolve(predictions)

            })
        })
    }
}

export default service
