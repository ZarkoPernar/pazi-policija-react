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

const googleStrategy = 

// heroku automatically asssigns the port to .env PORT
app.set('port', (process.env.PORT || 5000))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')

    if ('OPTIONS' == req.method) {
        res.send(200)
    } else {
        next()
    }
})

app.use(express.static(PUBLIC_DIR))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(expressSession(EXPRESS_SESSION_CONFIG))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

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
        console.log(req.body)
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
