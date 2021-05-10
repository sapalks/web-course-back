const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const axios = require('axios');
const PORT = process.env.PORT || 5000;
const app = express()
const urlencodedParser = bodyParser.urlencoded({extended : false});

require('dotenv').config()
require('./passport-setup')

app.set('view engine', 'ejs')

app.use('/static', express.static('static'))
app.use(bodyParser .json());
app.use(urlencodedParser)
app.use(cookieSession({
    name: 'mariya-session',
    keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/yandex', passport.authenticate('yandex'))

let auth_code;
 app.get('/yandex/callback', ({ query: { code } }, res) => {
        auth_code = code
        res.redirect('/token')
     }
)

let ref_token;
app.get('/token', (req, res) => {
    axios({
        method: 'POST',
        url: 'https://oauth.yandex.ru/token',
        data: "grant_type=authorization_code&client_id=e75a60c626c34fd2a3fc90a4a5e3017d&client_secret=3e70f09b521d4fcba3b872e337e9bdd3&code=" + auth_code,
    }).then(json => {res.render('token', { code: auth_code, refresh_token:  json.data.refresh_token})
        ref_token = json.data.refresh_token
    })
})

app.get('/refresh', (req, res) => {
        axios({
            method: 'POST',
            url: 'https://oauth.yandex.ru/token',
            data: "grant_type=refresh_token&client_id=e75a60c626c34fd2a3fc90a4a5e3017d&client_secret=3e70f09b521d4fcba3b872e337e9bdd3&refresh_token=" + ref_token,
        }).then(json => res.render('token', { code: auth_code, refresh_token:  json.data.refresh_token}))
    })

app.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
    }
)

app.listen(PORT, () => console.log('server has been started'))