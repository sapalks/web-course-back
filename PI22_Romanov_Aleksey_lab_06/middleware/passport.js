const yandex = require('../config/yandex')
const passport = require('passport-yandex')

const yandexStrategy = new passport.Strategy(
    {
        clientID: yandex.CLIENT_ID,
        clientSecret: yandex.CLIENT_SECRET,
        callbackURL: yandex.CALLBACK_URL
    },

    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
    }
)

module.exports = passport => {

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((obj, done) => {
        done(null, obj)
    })

    passport.use(yandexStrategy)
}