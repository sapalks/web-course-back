const passport = require('passport-yandex')

const yandex = module.exports = {
    CLIENT_ID : "2b5a914824bc430fb7ead9bedf8c9f0e",
    CLIENT_SECRET : "3c30082c2bbe4f8aab5d24444de50e63",
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