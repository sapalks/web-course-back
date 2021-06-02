const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const path = require('path')
const fetch = require('node-fetch')
const data = require('./config/data')
const options = { method: 'POST', body: '' }

app.set('views', path.join(__dirname, 'public'))
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(express.static('public'))
require('./config/passport')(passport)

app.get('/main', function(req, res) { res.sendFile(__dirname + '/public/main.html') })

app.get('/auth/yandex', passport.authenticate('yandex'))

app.get('/main/verification_code', function (req, res) {
    options.body = `grant_type=authorization_code&client_id=${data.YANDEX_CLIENT_ID}&client_secret=${data.YANDEX_CLIENT_SECRET}&code=${req.query.code}`
    fetch(data.YANDEX_TOKEN_URL, options)
    .then( res => res.json())
    .then( info => res.render('getToken.html', {access_token: info.access_token, expires_in: info.expires_in, refresh_token: info.refresh_token, token_type: info.token_type}))
});

app.post('/getInfo', function (req, res) {
    fetch(`${data.YANDEX_INFO_URL}?format=json&with_openid_identity=1&oauth_token=${req.body.access_token}`)
    .then( res => res.json())
    .then( info => res.render('getInfo.html', {email: info.default_email}))
});

app.post('/refreshToken', function(req, res) {
    options.body = `grant_type=refresh_token&client_id=${data.YANDEX_CLIENT_ID}&client_secret=${data.YANDEX_CLIENT_SECRET}&refresh_token=${req.body.refresh_token}`
    fetch(data.YANDEX_TOKEN_URL, options)
    .then( res => res.json())
    .then( info => res.render('getToken.html', {access_token: info.access_token, expires_in: info.expires_in, refresh_token: info.refresh_token, token_type: info.token_type}))
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
});