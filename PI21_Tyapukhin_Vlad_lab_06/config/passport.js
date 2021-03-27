const YandexStrategy = require('passport-yandex').Strategy
const YANDEX_CLIENT_ID = '3741c6c470c84866a52b8fa57bcc69fb'
const YANDEX_CLIENT_SECRET = 'c46af270358b409b9dfdc5eb22006ea6'

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