const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const strategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://pazi-policija.herokuapp.com/auth/google/callback'
    },
    function (token, tokenSecret, profile, done) {
        console.log(token, tokenSecret, profile, done)
        return done(null, profile)
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user)
        // })
    }
)

module.exports = strategy