const JwtStrategy = require('passport-jwt').Strategy
const ExctractJwt = require('passport-jwt').ExtractJwt
const db = require('./db')

const options = {
    jwtFromRequest: ExctractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await db.query(`SELECT * FROM users where id = $1`, [payload.userId])
                if (user.rowCount > 0) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e);
            }
        })
    )
}
