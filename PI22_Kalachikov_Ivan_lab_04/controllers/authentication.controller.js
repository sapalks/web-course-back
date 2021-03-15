const db = require("../db");

class AuthenticationController {
    async register(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        db.query("INSERT INTO client(login, password) VALUES ($1, $2) RETURNING *", [username, password], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(400)
            }
            res.send({
                status: 'ok'
            })
        })
    }

    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        db.query("SELECT * FROM client WHERE ")
    }
}

module.exports = new AuthenticationController();