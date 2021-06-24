const YandexStrategy = require('passport-yandex').Strategy
const ID = 'c599924f24e04265959150012eee7cd6'
const PASSWORD = 'cc82eeeaa201478a812fd1885bebe83a'

var strategy = new YandexStrategy(

    {
        clientID: ID,
        clientSecret: PASSWORD,
        callbackURL: 'http://localhost:3000/yandex/callback'
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