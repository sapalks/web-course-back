const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('./db')

async function haveThisUser(id) {
    const context = await db.query('SELECT * FROM app_user WHERE id = $1', [id]);
    return true ? context.rowCount > 0 : false;
}

const passport = function initislize(passport) {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';

    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                if(haveThisUser(payload.userId)) {
                    done(null, await db.query('SELECT * FROM app_user WHERE id = $1', [payload.userId]));
                } else {
                    done(null, false);
                }
            } catch (err) {
                done(err, false);
            }
        })
    );
}

module.exports = passport