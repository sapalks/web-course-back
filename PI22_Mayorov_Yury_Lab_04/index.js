const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const roleRoute = require('./routes/roles.routes.js');
const userRoute = require('./routes/users.routes.js');
const passportUsersRoute = require('./routes/passport-users.routes.js');
const jwtStrategy = require('./passport-user');

const port = 5294;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.use(jwtStrategy).initialize());

app.get('/ping', (req, res) => {
	res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', roleRoute)
app.use('/', userRoute)
app.use('/', passportUsersRoute)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});