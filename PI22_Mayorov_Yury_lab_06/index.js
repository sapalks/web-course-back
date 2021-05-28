const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const oauthRoutes = require('./routes/oauth.routes.js');

const port = 5294;

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(__dirname + '/views'));

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', oauthRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});