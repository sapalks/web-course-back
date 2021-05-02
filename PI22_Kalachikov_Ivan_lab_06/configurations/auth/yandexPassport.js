const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;
const keys = require('../keys')
const authController = require('../../controllers/authentication.controller')

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    const check = authController.findOneByYandexId(user.yandex_id)
    if (check) {
        done(null, user);
    }
});

passport.use(
    new YandexStrategy({
            clientID: keys.yandex.clientID,
            clientSecret: keys.yandex.clientSecret,
            callbackURL: keys.yandex.redirect
        },
        async (accessToken, refreshToken, profile, done) => {
            let client = await authController.findOneByYandexId(profile.id);
            if (!client) {
                client = await authController.saveClient(profile.displayName, profile.id)
            }
            client.accessToken = accessToken
            client.refreshToken = refreshToken
            done(null, client)
        })
);

