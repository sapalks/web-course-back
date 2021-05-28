const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../db')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = await db.query('SELECT * FROM users WHERE id = $1', [payload.userID]);
                if (user.rows[0]) {
                    done(null, user.rows[0]);
                } 
                else {
                    done(null, false);
                }
            } 
            catch (err) {
                done(err, false);
            }
        })
    );
}