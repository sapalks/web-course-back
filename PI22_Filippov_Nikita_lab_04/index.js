const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const countriesRoutes = require('./routes/countries.routes.js');
const hotelsRoutes = require('./routes/hotels.routes.js');
const usersRoutes = require('./routes/users.routes.js');
const jwtStrategy = require('./configs/passport');
const port = 5294;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.use(jwtStrategy).initialize());

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', countriesRoutes)
app.use('/', hotelsRoutes)
app.use('/', usersRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});