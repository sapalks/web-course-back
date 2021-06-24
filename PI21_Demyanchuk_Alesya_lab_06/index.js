const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport');
const axios = require('axios');

const yandexTokenURL = 'https://oauth.yandex.ru/token'

require('./passport')(passport)

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/style', express.static('style'))

let curr_code;
let curr_refresh_token;
let curr_access_token;

app.get('/', (req, res) => {
    res.render('main.html');
});

app.get('/yandex', passport.authenticate('yandex'))

app.get('/yandex/callback', ({
    query: {
        code
    }
}, res) => {
    curr_code = code
    res.redirect('/token')
})

app.get('/token', function (req, res) {
    axios({
        method: 'post',
        url: yandexTokenURL,
        data: "grant_type=authorization_code&client_id=c599924f24e04265959150012eee7cd6&client_secret=cc82eeeaa201478a812fd1885bebe83a&code=" + curr_code,
    }).then(json => {
        res.render('token.html', {
            code: curr_code,
            refresh_token: json.data.refresh_token
        })
        curr_refresh_token = json.data.refresh_token
        curr_access_token = json.data.access_token
    })
});

app.get('/refreshToken', function (req, res) {
    axios({
        method: 'post',
        url: yandexTokenURL,
        data: "grant_type=refresh_token&client_id=c599924f24e04265959150012eee7cd6&client_secret=cc82eeeaa201478a812fd1885bebe83a&refresh_token=" + curr_refresh_token,
    }).then(json => res.render('token.html', {
        code: curr_code,
        refresh_token: json.data.refresh_token
    }))
});

app.get('/getEmail', function (req, res) {
    axios({
            method: 'get',
            url: "https://login.yandex.ru/info?format=json&with_openid_identity=1&oauth_token=" + curr_access_token,
        })
        .then(json => res.render('email.html', {
            email: json.data.default_email
        }))
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})