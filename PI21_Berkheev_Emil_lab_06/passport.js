const passport = require('passport-yandex')

const yandex = module.exports = {
    CLIENT_ID : "05eb21e4cdef40a0b3d7fa6d5efde8f5",
    CLIENT_SECRET : "338f7ce4cc4046cca49c92f329e533a9",
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