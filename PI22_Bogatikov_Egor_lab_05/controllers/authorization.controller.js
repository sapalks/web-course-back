const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../configurations/db')
const config = require('../configurations/config')

class AuthorizationController {
    async login(req, res) {
        var { username, password } = req.body
        var candidate = await db.query('SELECT * FROM client WHERE username = $1', [username])
        if (candidate.rowCount > 0) {
            var isMatch = bcrypt.compareSync(password, candidate.rows[0].password)
            if (isMatch) {
                var token = jwt.sign({
                    username: candidate.rows[0].username,
                    userId: candidate.rows[0].id
                }, config.jwtKey, { expiresIn: config.ttl })
                res.status(200).send({ status: "ok", body: token })
            }
            else {
                res.status(401).send("Incorrect password.")
            }
        }
        else {
            res.status(404).send("There is no user with this login.")
        }
    }

    async register(req, res) {
        var { username, password } = req.body
        var candidate = await db.query('SELECT * FROM client WHERE username = $1', [username])
        console.log()
        if (candidate.rowCount > 0) {
            res.status(409).send({ message: 'This username is alredy taken.' })
        }
        else {
            var salt = bcrypt.genSaltSync(10)
            var crPassword = bcrypt.hashSync(password, salt)
            var newUser = await db.query(`INSERT INTO client (username, password) values ($1, $2) RETURNING * `, [username, crPassword])
            if (newUser.rows.length > 0) {
                res.status(201).send({ status: "ok" });
            }
            else {
                res.status(400).send("Error");
            }
        }
    }
}

module.exports = new AuthorizationController()