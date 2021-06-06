const YandexStrategy = require('passport-yandex').Strategy
const YANDEX_CLIENT_ID = 'c40d578b3ce64301926acb5f8211983f'
const YANDEX_CLIENT_SECRET = '856e1c30b87b41f998be814e7895b85b'

var strategy = new YandexStrategy(

    {
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/main/verification_code'
    },

    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
          });
      }
);

module.exports = passport => { passport.use(strategy) }