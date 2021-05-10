const YANdexStrategy = require('passport-yandex').Strategy
const passport = require('passport-yandex')
const clientId = '2ae1c626fb3044adbd352194efc7a902'
const clientSecret = '83856f6264754340925c1f0c59c5a0fd'

var yandexStrategy = new YANdexStrategy(
    {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: 'http://localhost:3000/authorization'
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