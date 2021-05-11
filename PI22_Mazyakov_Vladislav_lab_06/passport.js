const passport = require('passport-yandex')

const yandex = module.exports = {
    CLIENT_ID : "d4b824f06c714634ac91ddf316078701",
    CLIENT_SECRET : "e3a4af192253440186cc233a162e779f",
    CALLBACK_URL : "http://localhost:3000/auth"
};

var yandexStrategy = new passport.Strategy(
    {
        clientID: yandex.CLIENT_ID,
        clientSecret: yandex.CLIENT_SECRET,
        callbackURL: yandex.CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
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
