const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const port = 3000;
const eventRoute = require('./routes/events.routes.js');
const userRoute = require('./routes/users.routes.js');
const passportRoute = require('./routes/passport.routes.js');
const jwtStrategy = require('./passport');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.use(jwtStrategy).initialize());

app.get('/ping', (req, res) => {
	res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', eventRoute)
app.use('/', userRoute)
app.use('/', passportRoute)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});