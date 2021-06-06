const db = require('../connection.js')
const jwt = require('jsonwebtoken')
const expiresTime = 604800

class AuthController {
    async register(req, res) {
        const {login, password} = req.body
        if (!login || !password) {
            res.status(400).json({status: 'error', message: 'Inalid data'})
            return
        }
        //Проверяем есть ли слиент с таким же логином
        const client = await db.query(`SELECT *
                                       FROM client
                                       WHERE login = $1`, [login])
        if (client.login === login) {
            res.status(400).json({status: 'error', message: 'User with same login already exists'})
            return
        }
        await db.query(`INSERT INTO client(login, password)
                        VALUES ($1, $2)`, [login, password])
        res.status(200).json({status: 'ok', message: 'Client created'})
    }

    async login(req, res) {
        const {login, password} = req.body
        const candidate = await db.query(`SELECT *
                                          FROM client
                                          WHERE login = $1
                                            AND password = $2`, [login, password])
        if (candidate.rows[0]) {
            const token = jwt.sign({
                login: candidate.rows[0].login,
                clientId: candidate.rows[0].id
            }, 'secret-key', {expiresIn: expiresTime})
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Invalid login or password'
            })
        }
    }
}

module.exports = new AuthController()