const YandexStrategy = require("passport-yandex").Strategy;
const YANDEX_CLIENT_ID = "4cb615bc5a194e59a97eafe427431b2a";
const YANDEX_CLIENT_SECRET = "98d908ff83424662ab67fc6f617a600c";

var strategy = new YandexStrategy(
  {
    clientID: YANDEX_CLIENT_ID,
    clientSecret: YANDEX_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/result",
  },

  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
);

module.exports = (passport) => {
  passport.use(strategy);
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
