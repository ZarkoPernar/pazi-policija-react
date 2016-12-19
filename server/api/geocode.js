var NodeGeocoder = require('node-geocoder')

var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB2Vxg0KuWymrqutiyBdXcqEIOLm0GZf40', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
}

var geocoder = NodeGeocoder(options)

module.exports = geocode

function geocode(req, res) {
    if (!req.body) return res.json({error: 'Err'})

    geocoder.reverse({
        lat: req.body.lat,
        lon: req.body.lng
    })
        .then(function(result) {
            res.json(result)
        })
        .catch(function(err) {
            console.log(err)
        })

}

