const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const database = require('./database');

module.exports = passport => {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';

    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const client = (await database.query('select * from client where clientID = $1', [payload.clientID])).rows[0];
                if(client != null) {
                    done(null, client);
                } else {
                    done(null, false);
                }
            } catch (e) {
                done(e, false);
            }
        })
    );
}