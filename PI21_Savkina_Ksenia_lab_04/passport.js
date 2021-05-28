const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('./db.js')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, next) => {
            try {
                const customer = await db.query(`SELECT CustomerId FROM CUSTOMER WHERE CustomerId = $1`, [payload.id])
                if (customer.rows[0]) {
                    next(null, customer.rows[0])
                } else {
                    next(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}