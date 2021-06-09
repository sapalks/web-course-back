const express = require('express')
const passport = require('passport')
const fetch = require('node-fetch')
const conf = require('./config')


const PORT = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())
require('./passport')(passport)


app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/views'))

let refrash_token
let access_token
let token_type
let lifetime


app.get('/', (req, res) => {
    res.redirect('/main')
})

app.get('/main', (req, res) => {
    res.render('index.ejs')
})

app.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
    refrash_token = null
    access_token = null
    token_type = null
    lifetime = null
  })

app.get('/enter', passport.authenticate('yandex'))

app.get('/callback', async (req, res) => {
    const query = {
        body: `grant_type=authorization_code&client_id=${conf.CLIENT_ID}&client_secret=${conf.CLIENT_SECRET}&code=${req.query.code}`,
        method: 'post'
    }

    await fetch('https://oauth.yandex.ru/token', query)
        .then(res => res.json())
        .then(data => { access_token = data.access_token; refrash_token = data.refresh_token; lifetime = data.expires_in; token_type = data.token_type; })
    res.redirect('/token')
})

app.get('/token', (req, res) => {
    res.render('token.ejs', { access_token: access_token, refresh_token: refrash_token, lifetime: lifetime, type: token_type })
})

app.get('/updateToken', async (req, res) => {
    if (refrash_token != null) {
        const query = {
            body: `grant_type=refresh_token&refresh_token=${refrash_token}&client_id=${conf.CLIENT_ID}&client_secret=${conf.CLIENT_SECRET}`,
            method: 'post'
        }

        await fetch('https://oauth.yandex.ru/token', query)
            .then(res => res.json())
            .then(data => { access_token = data.access_token; refrash_token = data.refresh_token; lifetime = data.expires_in; token_type = data.token_type; })
    }
    res.redirect('/token')
})

app.get('/ping', (req, res) => {
    res.json({ 
        status: 'ok'
    })
})

app.listen(PORT, () => {
    console.log('Сервер доступен по адресу http://localhost:%d', PORT)
})


