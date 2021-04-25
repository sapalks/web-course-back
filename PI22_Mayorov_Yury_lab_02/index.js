const express = require('express');
const bodyParser = require('body-parser');

const roleRoute = require('./routes/roles.routes.js');
const userRoute = require('./routes/users.routes.js');

const port = 5294;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
	res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', roleRoute)
app.use('/', userRoute)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});