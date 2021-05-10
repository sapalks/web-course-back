const express = require('express')
const bodyParser = require('body-parser');
const port = 3000

const passport = require('passport')

const oauthRoutes = require('./routes/oauth');
const app = express()
app.use(passport.initialize())
require('./passport')(passport)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('views'));
app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', oauthRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
