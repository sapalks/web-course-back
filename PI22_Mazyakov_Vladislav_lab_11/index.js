const express = require('express')
const bodyParser = require('body-parser');
const port = 3000

const adverttRouter = require('./routes/advertisement.js')
const boardRouter = require('./routes/board.js')


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', boardRouter)
app.use('/', adverttRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
