const fetch = require('node-fetch')
const yandex = {
    CLIENT_ID: "a0234b7149974d50a0396d6d1c1aef67",
    CLIENT_SECRET: "98ff472af8014b79bf2275be2828493b",
    CALLBACK_URL: "http://localhost:5666/OAuth"
};

let oauth = {
    refreshToken: null,
    accessToken: null,
    typeToken: null,
    lifetimeToken: null
}

exports.main = (req, res) => {
    res.render('main.ejs');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/main');
    oauth = {}
}

exports.auth = async(req, res) => {
    const query = {
        body: `grant_type=authorization_code&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}&code=${req.query.code}`,
        method: 'post'
    };

    await fetch('https://oauth.yandex.ru/token', query)
        .then(res => res.json())
        .then(data => {
            oauth.accessToken = data.access_token;
            oauth.refreshToken = data.refresh_token;
            oauth.lifetimeToken = data.expires_in;
            oauth.typeToken = data.token_type;
        })
    res.redirect('/token');
}

exports.token = (req, res) => {
    res.render('token.ejs', { access_token: oauth.accessToken, refresh_token: oauth.refreshToken, lifetime: oauth.lifetimeToken, type: oauth.typeToken });
}

exports.updateToken = async(req, res) => {
    if (oauth.refreshToken != null) {
        const query = {
            body: `grant_type=refresh_token&refresh_token=${oauth.refreshToken}&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}`,
            method: 'post'
        }

        await fetch('https://oauth.yandex.ru/token', query)
            .then(res => res.json())
            .then(data => {
                oauth.accessToken = data.access_token;
                oauth.refreshToken = data.refresh_token;
                oauth.lifetimeToken = data.expires_in;
                oauth.typeToken = data.token_type;
            })
    }
    res.redirect('/token')
}