const fetch = require('node-fetch')
const yandex = {
    CLIENT_ID : "d4b824f06c714634ac91ddf316078701",
    CLIENT_SECRET : "e3a4af192253440186cc233a162e779f",
    CALLBACK_URL : "http://localhost:3000/auth"
};

let refreshToken;
let accessToken;
let typeToken;
let lifetimeToken;

exports.main = (req, res) => {
    res.render('main.ejs');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/main');
    accessToken = null;
    refreshToken = null;
    typeToken = null;
    lifetimeToken = null;
}

exports.auth = async (req, res) => {
    const query = {
        body: `grant_type=authorization_code&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}&code=${req.query.code}`,
        method: 'post'
    };

    await fetch('https://oauth.yandex.ru/token', query)
        .then(res => res.json())
        .then(data => { accessToken = data.access_token; refreshToken = data.refresh_token; lifetimeToken = data.expires_in; typeToken = data.token_type; })
    res.redirect('/token');
}

exports.token = (req, res) => {
    res.render('token.ejs', { access_token: accessToken, refresh_token: refreshToken, lifetime: lifetimeToken, type: typeToken });
}

exports.updateToken = async (req, res) => {
    if (refreshToken != null) {
        const query = {
            body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}`,
            method: 'post'
        }

        await fetch('https://oauth.yandex.ru/token', query)
            .then(res => res.json())
            .then(data => { accessToken = data.access_token; refreshToken = data.refresh_token; lifetimeToken = data.expires_in; typeToken = data.token_type; })
    }
    res.redirect('/token')
}
