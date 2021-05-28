const express = require('express')
const app = express()
const port = 3000

const passport = require('passport');

const oauthRoutes = require('./routes/oauth');


app.use(express.json());

app.set('view engine', 'ejs')

app.use(passport.initialize())

app.use(express.static('views'));

app.use('/', oauthRoutes)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});



