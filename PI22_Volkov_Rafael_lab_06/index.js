const express = require('express')
const app = express()
const port = 5666

const passport = require('passport');

const oauthRoutes = require('./routes/OAuth');


app.use(express.json());

app.set('view engine', 'ejs')

app.use(passport.initialize())

app.use(express.static('Views'));

app.use('/', oauthRoutes)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});