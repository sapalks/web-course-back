const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const database = require('./ConnectToBd');

module.exports = passport => {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';

    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user_ = (await database.query('select * from user_ where userID = $1', [payload.userID])).rows[0];
                if(user_ != null) {
                    done(null, user_);
                } else {
                    done(null, false);
                }
            } catch (e) {
                done(e, false);
            }
        })
    );
}