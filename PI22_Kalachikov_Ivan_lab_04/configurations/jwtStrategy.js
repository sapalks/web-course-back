const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const authController = require("../controllers/authentication.controller");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'wowsecret';
opts.maxAge = 7 * 24 * 60 * 60 * 1000;

var strategy = new JwtStrategy(opts, function (jwt_payload, next) {
    const user = authController.findOneById({id: jwt_payload.sub})
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

module.exports = strategy;