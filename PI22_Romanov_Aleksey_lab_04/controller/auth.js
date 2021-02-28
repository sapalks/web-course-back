const db = require('../db')
const jwt = require('jsonwebtoken')
const timeExpire = 604800

const findOneUser = async (login) => {
    const candidate = await db.query('SELECT * FROM USERS WHERE username = $1', [login])
    return candidate.rows[0] ? candidate.rows[0] : {}
}

class AuthController {
    async register(req, res) {
        let { username, password } = req.body

        username = username.trim()
        password = password.trim()

        if (!username || !password) {
            res.staus(400).json({ status: 'error', error: 'invalid body' })
            return
        }

        const candidate = await findOneUser(username)
        if (username === candidate.username) {
            res.status(400).json({ status: 'error', error: 'username already exists' })
            return
        }

        await db.query('INSERT INTO users(username, password) values ($1,$2)', [username, password])

        res.status(200).json({ status: 'ok' })
    }

    async login(req, res) {
        let { username, password } = req.body

        username = username.trim()
        password = password.trim()

        if (!username || !password) {
            res.staus(400).json({ status: 'error', error: 'invalid body' })
            return
        }

        const candidate = await findOneUser(username)
        if (!candidate || password !== candidate.password ) {
            res.status(400).json({ status: 'error', error: 'invalid credentials' })
            return
        }
        const token = jwt.sign({
            username,
            userId: candidate.id
        }, 'jwt', { expiresIn: timeExpire })

        res.status(200).json({ status: 'ok', token: `Bearer ${token}` })
    }
}

module.exports = new AuthController()