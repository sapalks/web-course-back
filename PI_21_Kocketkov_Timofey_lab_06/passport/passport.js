const YANdexStrategy = require('passport-yandex').Strategy
const passport = require('passport-yandex')
const clientId = '05b6c13ef06d481c82dfd615201edcb5'
const clientSecret = '5785ae250ff940b687f2d590e2e75127'

var yandexStrategy = new YANdexStrategy(
    {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: 'http://localhost:8100/auth'
    },

    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
);

module.exports = passport => {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(yandexStrategy);
}