const getNearbyLocations = require('./near')
const addLocation = require('./addLocation')
const geocode = require('./geocode')
const login = require('./auth/login')

module.exports = {
    getNearbyLocations,
    addLocation,
    geocode,
    login,
}
