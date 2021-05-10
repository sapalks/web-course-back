const db = require('../connection.js')
const jwt = require('jsonwebtoken')
const expiresTime = 604800

class AuthorizationController {
    async register(req, res) {
        const { login, password } = req.body
        if (!login || !password) {
            res.status(400).json({ status: 'error', message: 'Inalid data' })
            return
        }

        const hospitaluser = await db.query(`SELECT * FROM hospitaluser WHERE login = $1`, [login])
        if (hospitaluser.login === login) {
            res.status(400).json({ status: 'error', message: 'User exists' })
            return
        }
        await db.query(`INSERT INTO hospitaluser(login,password) VALUES ($1,$2)`, [login, password])
        res.status(200).json({ status: 'ok', message: 'hospital user created' })
    }

    async login(req, res) {
        const { login, password } = req.body
        const candidate = await db.query(`SELECT * FROM hospitaluser WHERE login = $1 AND password = $2`, [login, password])
        if (candidate.rows[0]) {
            const token = jwt.sign({
                login: candidate.rows[0].login,
                hospitaluserId: candidate.rows[0].id
            }, 'secret', { expiresIn: expiresTime })
            res.status(200).json({ token: `${token}` })
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Invalid login or password'
            })
        }
    }
}

module.exports = new AuthorizationController()