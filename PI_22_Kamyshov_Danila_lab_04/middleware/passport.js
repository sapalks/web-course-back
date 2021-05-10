const JwtStrategy = require('passport-jwt').Strategy
const ExctractJwt = require('passport-jwt').ExtractJwt
const db = require('../db')

const options = {
    jwtFromRequest: ExctractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt'
}

const findById = async (id) => {
    const users = await db.query('SELECT * FROM user_ip where id = $1', [id])
    return users.rows[0]
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await findById(payload.userId)
                user ? done(null, user) : done(null, false)
            } catch (e) {
                console.log(e);
            }
        })
    )
}