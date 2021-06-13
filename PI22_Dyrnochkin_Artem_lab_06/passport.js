const GithubStrategy = require('passport-github').Strategy
const Github_CLIENT_ID = 'e5950a9f181c9cc69f52'
const Github_CLIENT_SECRET = 'c789722c472679929a4b46c1795f3378a500d811'

var strategy = new GithubStrategy({
        clientID: Github_CLIENT_ID,
        clientSecret: Github_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/github/callback'
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
