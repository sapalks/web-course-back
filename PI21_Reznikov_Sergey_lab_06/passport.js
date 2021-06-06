const passport = require('passport-yandex')

const yandex = module.exports = {
    CLIENT_ID : "06ac732ade174dafad08c24a23c33f06",
    CLIENT_SECRET : "7d48b0360ccf41c3b621eb5f4e0328e0",
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