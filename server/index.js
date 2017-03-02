const express = require('express')
// const useragent = require('useragent')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config()


const app = express()
const PUBLIC_DIR = 'public'
const routes = require('./routes')
const api = require('./api')
require('./db')

const EXPRESS_SESSION_CONFIG = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}

app.set('port', (process.env.NODE_SERVER_PORT || 5000))

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    function (token, tokenSecret, profile, done) {
        return done(profile)
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user)
        // })
    }
))

app.use(express.static(PUBLIC_DIR))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(expressSession(EXPRESS_SESSION_CONFIG))
app.use(passport.initialize())
app.use(passport.session())

// app.use(checkUserAgent)

app.listen(app.get('port'), () => {
    console.log('Node app listening on port: ' + app.get('port'))
})

app.post(routes.NEAR, api.getNearbyLocations)
app.post(routes.ADD, api.addLocation)
app.post(routes.GEOCODE, api.geocode)

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
        res.json(req.body)
    }
)


// function checkUserAgent(req, res, next) {
//     console.log(
//         useragent.parse(req.headers['user-agent']).os.toString(),
//         useragent.parse(req.headers['user-agent']).device.toString()
//     )

//     next()
// }
