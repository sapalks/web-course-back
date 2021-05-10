const passport = require('passport-yandex')

const yandex = module.exports = {
    CLIENT_ID : "f8f3c999ed5f4590a09e364397fb136d",
    CLIENT_SECRET : "da5b88cf62be4668a1a48763cfc33973",
    CALLBACK_URL : "http://localhost:3000/auth"
}; 

var yandexStrategy = new passport.Strategy(
    {
        clientID: yandex.CLIENT_ID,
        clientSecret: yandex.CLIENT_SECRET,
        callbackURL: yandex.CALLBACK_URL
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