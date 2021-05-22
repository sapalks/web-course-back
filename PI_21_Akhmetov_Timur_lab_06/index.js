const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fetch = require('node-fetch')
const passport = require('passport')

const YANDEX_CLIENT_ID = '04a46d5c333a4b3e96727c51540c489e'
const YANDEX_CLIENT_SECRET = 'b641d31ea82e46a89918d39d32d26318'

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(express.static('public'));
require('./passport')(passport)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.get('/main', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.post('/main', function(req, res) {
    res.redirect('/auth/yandex');
});

app.get('/auth/yandex', passport.authenticate('yandex'));

app.get('/auth/yandex/callback', passport.authenticate('yandex'));

app.get('/main/verification_code', function (req, res) {
    const code = req.query.code
    const options = { body: `grant_type=authorization_code&client_id=${YANDEX_CLIENT_ID}&client_secret=${YANDEX_CLIENT_SECRET}&code=${code}`, method: 'post' };
    fetch('https://oauth.yandex.ru/token', options)
    .then( res => res.json())
    .then( data => res.render('getToken.html', {access_token: data.access_token, expires_in: data.expires_in, refresh_token: data.refresh_token, token_type: data.token_type}))
});

app.post('/getInfo', function (req, res) {
    fetch(`https://login.yandex.ru/info?format=json&with_openid_identity=1&oauth_token=${req.body.access_token}`)
    .then( res => res.json())
    .then( data => res.render('getInfo.html', {email: JSON.stringify(data.default_email)}));
});

app.post('/refreshToken', function(req, res) {
    const options = { body: `grant_type=refresh_token&client_id=${YANDEX_CLIENT_ID}&client_secret=${YANDEX_CLIENT_SECRET}&refresh_token=${req.body.refresh_token}`, method: 'post' };
    fetch('https://oauth.yandex.ru/token', options)
    .then( res => res.json())
    .then( data => res.render('getToken.html', {access_token: data.access_token, expires_in: data.expires_in, refresh_token: data.refresh_token, token_type: data.token_type}));
});