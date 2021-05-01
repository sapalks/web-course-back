const passport = require('passport')
const YandexStrategy = require('passport-yandex').Strategy

const YANDEX_CLIENT_ID = process.env.CLIENT_ID
const YANDEX_CLIENT_SECRET = process.env.CLIENT_SECRET

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new YandexStrategy({
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/yandex/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

