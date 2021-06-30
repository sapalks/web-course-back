const YandexStrategy = require('passport-yandex').Strategy
const clientId = '0d6ab1c267fd4ca4861f49e1ba561f12'
const clientSecret = 'c7e5718556b54b59ae31f48302231a1e'

var yandexStrategy = new YandexStrategy(
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

const passport = function initialize(passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(yandexStrategy);
}

module.exports = passport