const db = require('../db/db')
const jwt = require('jsonwebtoken')
const timeExpire = 604800

const findOneUser = async (login) => {
    const user = await db.query('SELECT * FROM USERS WHERE login = $1', [login])
    return user.rows[0] ? user.rows[0] : {}
}

class AuthController {
    async register(req, res) {
        let { login, password, username, phone } = req.body

        login = login.trim()
        password = password.trim()
        username = username.trim()
        phone = phone.trim()

        if (!login || !password) {
            res.staus(400).json({ status: 'error', error: 'invalid body' })
            return
        }

        const user = await findOneUser(login)
        if (login === user.username) {
            res.status(400).json({ status: 'error', error: 'username already exists' })
            return
        }

        await db.query('INSERT INTO users(login, password, username, phone) values ($1,$2,$3,$4)', [login, password, username, phone])

        res.status(200).json({ status: 'ok' })
    }

    async login(req, res) {
        let { login, password } = req.body

        login = login.trim()
        password = password.trim()

        if (!login || !password) {
            res.staus(400).json({ status: 'error', error: 'invalid body' })
            return
        }

        const user = await findOneUser(login)
        if (!user || password !== user.password ) {
            res.status(400).json({ status: 'error', error: 'invalid credentials' })
            return
        }
        const token = jwt.sign({
            username: login,
            userId: user.id
        }, 'jwt', { expiresIn: timeExpire })

        res.status(200).json({ status: 'ok', token: token })
    }
}

module.exports = new AuthController()