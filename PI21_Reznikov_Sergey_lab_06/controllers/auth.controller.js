const fetch = require('node-fetch')
const yandex = {
    CLIENT_ID : "06ac732ade174dafad08c24a23c33f06",
    CLIENT_SECRET : "7d48b0360ccf41c3b621eb5f4e0328e0",
    CALLBACK_URL : "http://localhost:3000/auth"
}; 

let oauth = {
    refreshToken: null,
    accessToken: null,
    lifetimeToken: null
}

//вызов страницы
exports.main = (req, res) => {
    res.render('main.ejs');
};

//Переадресация на вызов страницы и обнуление
exports.signOut = (req, res) => {
    res.redirect('/main');
    oauth = {}
}

//Получение токена
exports.auth = async (req, res) => {
    const query = {
        body: `grant_type=authorization_code&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}&code=${req.query.code}`,
        method: 'post'
    };
    await fetch('https://oauth.yandex.ru/token', query)
        .then(res => res.json())
        .then(data => { oauth.accessToken = data.access_token; 
            oauth.refreshToken = data.refresh_token; 
            oauth.lifetimeToken = data.expires_in;})
    res.redirect('/tokens');
}

//Вызов страницы
exports.tokens = (req, res) => {
    res.render('tokens.ejs', { access_token: oauth.accessToken, refresh_token: oauth.refreshToken, lifetime: oauth.lifetimeToken});
}

//Обновление токенов
exports.update = async (req, res) => {
    if (oauth.refreshToken != null) {
        const query = {
            body: `grant_type=refresh_token&refresh_token=${oauth.refreshToken}&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}`,
            method: 'post'
        }
        await fetch('https://oauth.yandex.ru/token', query)
            .then(res => res.json())
            .then(data => { oauth.accessToken = data.access_token; oauth.refreshToken = data.refresh_token; oauth.lifetimeToken = data.expires_in; })
    }
    res.redirect('/tokens')
} 