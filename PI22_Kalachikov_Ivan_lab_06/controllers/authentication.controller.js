const db = require("../configurations/db");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const keys = require('../configurations/keys')
const fetch = require("node-fetch");

class AuthenticationController {
    async getTokens(req, res) {
        await fetch('https://oauth.yandex.ru/token', {
            method: 'post',
            body: 'grant_type=authorization_code' +
                '&client_id=' + keys.yandex.clientID +
                '&code=' + req.query.code +
                '&client_secret=' + keys.yandex.clientSecret +
                '&redirect_uri=' + keys.yandex.redirect,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json()).then(data => {res.render('tokens', {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            time: data.expires_in
        })})
    }

    async getCode(req, res) {
        await fetch('https://oauth.yandex.ru/authorize?response_type=code&client_id=' + keys.yandex.clientID)
        .then(res => res.json()).then(data => {res.render('tokens', {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            time: data.expires_in
        })})
    }

    async refreshTokens(req, res) {
        await fetch('https://oauth.yandex.ru/token', {
            method: 'post',
            body: 'grant_type=refresh_token' +
                '&refresh_token=' + req.body.refreshToken +
                '&client_id=' + keys.yandex.clientID +
                '&client_secret=' + keys.yandex.clientSecret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json()).then(data => res.render('tokens', {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            time: data.expires_in
        }))
    }

    async findOneById(id) {
        const client = await db.query('SELECT * FROM client WHERE id = $1', [id]);
        return client.rows[0];
    }

    async findOneByYandexId(id) {
        const client = await db.query('SELECT * FROM client WHERE yandex_id = $1', [id]);
        return client.rows[0];
    }

    async saveClient(login, yandex_id) {
        db.query("INSERT INTO client(login, yandex_id) VALUES ($1, $2) RETURNING *",
            [login, yandex_id])
    }

    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
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
                res.render('tokens')
            })
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const username = req.body.username;
        const password = req.body.password;
        const user = await (username)

        if (!user) {
            res.status(401).json({
                status: "error",
                body: "Неверный пароль или логин"
            });
        }

        if (bcrypt.compareSync(password, user.password)) {
            res.json({
                status: "ok",
                body: 'token'
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