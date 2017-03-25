const express = require('express')
// const useragent = require('useragent')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
require('dotenv').config()

const EXPRESS_SESSION_CONFIG = require('./config/expressSession')
const googleAuthStrategy = require('./config/googleStrategy')
const app = express()
const PUBLIC_DIR = 'public'
const initRoutes = require('./routes')

// init mongo db
require('./db')

// heroku automatically asssigns the port to .env PORT
app.set('port', (process.env.PORT || 5000))

// trying to sort out the cors issues with passport
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', 'no-cors')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')

    if ('OPTIONS' == req.method) {
        res.send(200)
    } else {
        next()
    }
})

passport.use(googleAuthStrategy)

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



app.listen(app.get('port'), () => {
    console.log('Node app listening on port: ' + app.get('port'))
})

initRoutes(app)


// app.use(checkUserAgent)

// function checkUserAgent(req, res, next) {
//     console.log(
//         useragent.parse(req.headers['user-agent']).os.toString(),
//         useragent.parse(req.headers['user-agent']).device.toString()
//     )

//     next()
// }
