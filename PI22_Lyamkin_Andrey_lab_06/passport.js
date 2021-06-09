const conf = require('./config')
const passport = require('passport-yandex')

var strategy = new passport.Strategy(
    {
        clientID: conf.CLIENT_ID,
        clientSecret: conf.CLIENT_SECRET,
        callbackURL: conf.CALLBACK_URL
    },

    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile)
        })
    }
)

module.exports = passport => {

    passport.serializeUser(function (user, done) {
        done(null, user)
    })

    passport.deserializeUser(function (obj, done) {
        done(null, obj)
    })

    passport.use(strategy)
}