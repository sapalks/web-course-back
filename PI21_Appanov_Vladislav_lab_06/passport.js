const YandexStrategy = require('passport-yandex').Strategy
const YANDEX_CLIENT_ID = 'bcd79471fb174bd5ab416ad6d781cf76'
const YANDEX_CLIENT_SECRET = 'a427237b7ebd4176944f9584dae1e022'

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