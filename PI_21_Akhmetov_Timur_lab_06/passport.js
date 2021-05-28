const YandexStrategy = require('passport-yandex').Strategy
const YANDEX_CLIENT_ID = '04a46d5c333a4b3e96727c51540c489e'
const YANDEX_CLIENT_SECRET = 'b641d31ea82e46a89918d39d32d26318'

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