const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;
const keys = require('../keys')
const authController = require('../../controllers/authentication.controller')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    authController.findOneByYandexId(id).then((user) => {
        done(null, user)
    })
})

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
            done(null, client)
        })
);

