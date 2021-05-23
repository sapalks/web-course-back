const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../db')

const findById = async (id) => {
    const users = await db.query('SELECT * FROM users WHERE userid = $1', [id]);
    return users.rows[0];
}

module.exports = passport => {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';

    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = await findById(payload.userID)
                if(user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                done(err, false);
            }
        })
    );
}