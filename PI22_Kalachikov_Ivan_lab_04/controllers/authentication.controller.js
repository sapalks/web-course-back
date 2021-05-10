const db = require("../configurations/db");
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const findOneByLogin = async function (login) {
    const client = await db.query('SELECT * FROM client WHERE login = $1', [login]);
    return client.rows[0];
}

class AuthenticationController {

    async findOneById(id) {
        const client = await db.query('SELECT * FROM client WHERE id = $1', [id]);
        return client.rows[0];
    }

    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const username = req.body.username;
        const password = req.body.password;

        const hashPassword = bcrypt.hashSync(password, saltRounds);

        db.query("INSERT INTO client(login, password) VALUES ($1, $2) RETURNING *", [username, hashPassword],
            (err, result) => {
                if (err || result.rows.length === 0) {
                    return res.status(401).json({
                        status: 'error',
                        body: err.message
                    })
                }
                res.send({
                    status: 'ok'
                })
            })
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const username = req.body.username;
        const password = req.body.password;
        const user = await findOneByLogin(username)

        if (!user) {
            res.status(401).json({
                status: "error",
                body: "Неверный пароль или логин"
            });
        }

        if (bcrypt.compareSync(password, user.password)) {
            const payload = {id: user.id};
            const token = jwt.sign(payload, "wowsecret");
            res.json({
                status: "ok",
                body: token
            });
        } else {
            res.status(401).json({
                status: "error",
                body: "Неверный пароль или логин"
            });
        }
    }
}

module.exports = new AuthenticationController();