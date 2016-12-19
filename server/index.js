var express = require('express')
var useragent = require('useragent')

var app = express()
var bodyParser = require('body-parser')
const db = require('./db')

const routes = require('./routes')
const api = require('./api')

app.use(express.static('dist'))
app.use(bodyParser.json())
// app.use(checkUserAgent)

app.listen(3000, function () {})

app.post(routes.NEAR, api.getNearbyLocations)
app.post(routes.ADD, api.addLocation)
app.post(routes.GEOCODE, api.geocode)


// function checkUserAgent(req, res, next) {
//     console.log(
//         useragent.parse(req.headers['user-agent']).os.toString(),
//         useragent.parse(req.headers['user-agent']).device.toString()
//     )

//     next()
// }