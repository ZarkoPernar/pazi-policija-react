const passport = require('passport')

const api = require('../api')

const PREFIX = '/api'
const API_VERSION = 'v1'

const ROUTES = {
    ADD: PREFIX + '/' + API_VERSION + '/locations/add',
    NEAR: PREFIX + '/' + API_VERSION + '/locations/near',
    GEOCODE: PREFIX + '/' + API_VERSION + '/locations/geocode',

    LOGIN: '/auth/login',
}

module.exports = function(app) {
    app.post(ROUTES.NEAR, api.getNearbyLocations)
    app.post(ROUTES.ADD, function(req, res, next) {
        console.log(req.user)
        next()
    }, api.addLocation) //passport.authenticate('google')
    app.post(ROUTES.GEOCODE, api.geocode)

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login']
    }))
    app.get('/auth/logout', function(req, res) {
        req.logout()
    })
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            console.log(req.body)
            res.json(req.body)
        }
    )
}

