const passport = require('passport-yandex')

const yandex = module.exports = {
    CLIENT_ID: "a0234b7149974d50a0396d6d1c1aef67",
    CLIENT_SECRET: "98ff472af8014b79bf2275be2828493b",
    CALLBACK_URL: "http://localhost:5666/OAuth"
};

var yandexStrategy = new passport.Strategy({
        clientID: yandex.CLIENT_ID,
        clientSecret: yandex.CLIENT_SECRET,
        callbackURL: yandex.CALLBACK_URL
    },

    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }
);

module.exports = passport => {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(yandexStrategy);
}