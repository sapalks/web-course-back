const fetch = require('node-fetch')
const yandex = require('../configs/yandex.config')

let ref_token;
let acs_token;
let type;
let lifetime;

exports.main = (req, res) => {
    res.render('main.ejs');
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/main');
    ref_token = null;
    acs_token = null;
    type = null;
    lifetime = null;
}
exports.auth = async (req, res) => {
    const query = {
        body: `grant_type=authorization_code&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}&code=${req.query.code}`,
        method: 'post'
    };

    await fetch('https://oauth.yandex.ru/token', query)
        .then(res => res.json())
        .then(data => { acs_token = data.access_token; ref_token = data.refresh_token; lifetime = data.expires_in; type = data.token_type; })
    res.redirect('/token');
}
exports.token = (req, res) => {
    res.render('token.ejs', { access_token: acs_token, refresh_token: ref_token, lifetime: lifetime, type: type });
}
exports.updateToken = async (req, res) => {
    if (ref_token != null) {
        const query = {
            body: `grant_type=refresh_token&refresh_token=${ref_token}&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}`,
            method: 'post'
        }

        await fetch('https://oauth.yandex.ru/token', query)
            .then(res => res.json())
            .then(data => { acs_token = data.access_token; ref_token = data.refresh_token; lifetime = data.expires_in; type = data.token_type; })
    }
    res.redirect('/token')
}