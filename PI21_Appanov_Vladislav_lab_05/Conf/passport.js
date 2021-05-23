const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../connection.js')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const hospitaluser = await db.query(`SELECT id, login FROM hospitaluser WHERE id = $1`, [payload.hospitaluserId])
                if (hospitaluser.rows[0]) {
                    done(null, hospitaluser.rows[0])
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}
