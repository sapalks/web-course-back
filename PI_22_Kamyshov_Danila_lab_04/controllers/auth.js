const db = require('../db')
const jwt = require('jsonwebtoken')
const timeExpire = 604800

const findOneUser = async (login) => {
    const candidate = await db.query('SELECT * FROM user_ip WHERE login = $1', [login])
    return candidate.rows[0] ? candidate.rows[0] : {}
}

class AuthController {
    async register(req, res) {
        let { fio, login, password } = req.body
        fio = fio.trim()
        login = login.trim()
        password = password.trim()

        if (!login || !password) {
            res.staus(400).json({ status: 'error', error: 'invalid body' })
            return
        }

        const candidate = await findOneUser(login)
        if (login === candidate.login) {
            res.status(400).json({ status: 'error', error: 'login already exists' })
            return
        }

        await db.query('INSERT INTO user_ip(fio, login, password) values ($1,$2, $3)', [fio, login, password])

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

        const candidate = await findOneUser(login)
        if (!candidate || password !== candidate.password ) {
            res.status(400).json({ status: 'error', error: 'invalid credentials' })
            return
        }
        const token = jwt.sign({
            username: login,
            userId: candidate.id
        }, 'jwt', { expiresIn: timeExpire })

        res.status(200).json({ status: 'ok', token: `Bearer ${token}` })
    }
}

module.exports = new AuthController()