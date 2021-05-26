const fetch = require('node-fetch')
const yandex = require('../config/yandex')

let auth = {}

const fillAuth = (data) => {
    auth.access_token = data.access_token
    auth.refresh_token = data.refresh_token
    auth.lifetime = data.expires_in
    auth.type = data.token_type
}

class OauthController {
    index(req, res) {
        res.render('index')
    }

    async auth(req, res) {
        await fetch('https://oauth.yandex.ru/token', {
            body: `grant_type=authorization_code&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}&code=${req.query.code}`,
            method: 'post'
        }).then(res => res.json()).then((data) => fillAuth(data))

        res.redirect('/tokens')
    }

    tokens(req, res) {
        res.render('tokens.ejs', auth)
    }

    async updateToken(req, res) {
        if (auth.refresh_token != null) {
            await fetch('https://oauth.yandex.ru/token', {
                body: `grant_type=refresh_token&refresh_token=${auth.refresh_token}&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}`,
                method: 'post'
            }).then(res => res.json()).then((data) => fillAuth(data))
        }

        res.redirect('/tokens')
    }

    logout(req, res) {
        req.logout()
        res.redirect('/index')
        auth = {}
    }
}

module.exports = new OauthController()