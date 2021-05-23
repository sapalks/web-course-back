const YandexStrategy = require('passport-yandex').Strategy
const YANDEX_CLIENT_ID = 'b82a6c21fd9d42cf956a268c6b8db2ca'
const YANDEX_CLIENT_SECRET = '8e3f8fd3839f42c697b80c92af382c99'

var strategy = new YandexStrategy({
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/yandex/callback'
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

    passport.use(strategy);
}