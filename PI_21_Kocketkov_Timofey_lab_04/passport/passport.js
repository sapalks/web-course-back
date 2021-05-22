const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../db')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, next) => {
            try {
                const user = await db.query(`SELECT * FROM USERS WHERE Id = $1`, [payload.id])
                if (user.rows[0]) {
                    next(null, user.rows[0])
                } else {
                    next(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}