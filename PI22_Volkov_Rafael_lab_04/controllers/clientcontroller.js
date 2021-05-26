const database = require('../database')
const jwt = require('jsonwebtoken')
const timeExpire = 604800

const checkUser = async(login) => {
    const logUsr = await database.query('SELECT * FROM user_token WHERE login = $1', [login])
    return logUsr.rows[0] ? logUsr.rows[0] : {}
}

class clientController {
    async register(req, res) {
        let { name, login, password } = req.body
        name = name.trim()
        login = login.trim()
        password = password.trim()

        if (!login || !password) {
            res.staus(400).json({ status: 'error', error: 'invalid body' })
            return
        }

        const usr = await checkUser(login)
        if (login === usr.login) {
            res.status(400).json({ status: 'error', error: 'login already exists' })
            return
        }

        await database.query('INSERT INTO user_token(name, login, password) values ($1,$2, $3)', [name, login, password])

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

        const usr = await checkUser(login)
        if (!usr || password !== usr.password) {
            res.status(400).json({ status: 'error', error: 'invalid credentials' })
            return
        }
        const token = jwt.sign({
            username: login,
            userId: usr.id
        }, 'jwt', { expiresIn: timeExpire })

        res.status(200).json({ status: 'ok', token: `Bearer ${token}` })
    }
}

module.exports = new clientController()