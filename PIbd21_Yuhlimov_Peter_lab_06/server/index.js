const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const url = require('url')
const path = require('path')
const fetch = require('node-fetch')
const YANDEX_CLIENT_ID = '0aa15632fd5a4992a65fca84e483821b'
const YANDEX_CLIENT_SECRET = 'b3865b9bc7c341678649442f5896eeae'

const yandexTokenURL = 'https://oauth.yandex.ru/token'
const yandexInfoURL = 'https://login.yandex.ru/info'

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
    const reqUrl = req.url;
    const urlObj = url.parse(reqUrl, true);
    const queryData = urlObj.query;

    const options = {
        body: "grant_type=authorization_code&client_id="+ YANDEX_CLIENT_ID + "&client_secret=" + YANDEX_CLIENT_SECRET + "&code=" + queryData.code,
        method: 'post'
    };

    fetch(yandexTokenURL, options)
    .then( res => res.json())
    .then( data => getToken(res, data))
});

function getToken(res, info) {
    res.render('getToken.html', {access_token: JSON.stringify(info.access_token), expires_in: JSON.stringify(info.expires_in), 
        refresh_token: JSON.stringify(info.refresh_token), token_type: JSON.stringify(info.token_type)});
    res.sendFile(__dirname + '/public/getToken.html');
}

app.get('/getInfo', function (req, res) {
    res.sendFile(__dirname + '/public/getInfo.html');
});

app.post('/getInfo', function (req, res) {

    const params = "?format=json&with_openid_identity=1&oauth_token=" + req.body.access_token;

    fetch(yandexInfoURL + params)
    .then( res => res.json())
    .then( data => getInfo(res, data));
});

function getInfo(res, info) {
    res.render('getInfoInToken.html', {email: JSON.stringify(info.default_email)})
    res.sendFile(__dirname + '/public/getInfoInToken.html');
}

app.get('/refreshToken', function(req, res) {
    res.sendFile(__dirname + '/public/refreshToken.html');
});

app.post('/refreshToken', function(req, res) {
    
    const options = {
        body: `grant_type=refresh_token&client_id=`+YANDEX_CLIENT_ID+`&client_secret=`+YANDEX_CLIENT_SECRET+`&refresh_token=` + req.body.refresh_token,
        method: 'post'
    };

    fetch(yandexTokenURL, options)
    .then( res => res.json())
    .then( data => refreshToken(res, data));
});

function refreshToken(res, info) {
    res.render('getToken.html', {access_token: JSON.stringify(info.access_token), expires_in: JSON.stringify(info.expires_in), 
        refresh_token: JSON.stringify(info.refresh_token), token_type: JSON.stringify(info.token_type)})
    res.sendFile(__dirname + '/public/getToken.html');
}