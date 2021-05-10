const YandexStrategy = require('passport-yandex').Strategy
const YANDEX_CLIENT_ID = '0aa15632fd5a4992a65fca84e483821b'
const YANDEX_CLIENT_SECRET = 'b3865b9bc7c341678649442f5896eeae'

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

module.exports = passport => {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(strategy);
}