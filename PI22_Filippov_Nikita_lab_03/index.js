const express = require('express');
const bodyParser = require('body-parser');

const countriesRoutes = require('./routes/countries.routes.js');
const hotelsRoutes = require('./routes/hotels.routes.js');
const port = 5294;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', countriesRoutes)
app.use('/', hotelsRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});