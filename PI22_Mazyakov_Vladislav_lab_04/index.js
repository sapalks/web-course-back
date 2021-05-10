const express = require('express')
const bodyParser = require('body-parser');
const port = 3000

const passport = require('passport')
const boardRouter = require('./routes/board')
const advertRouter = require('./routes/advertisement')
const userRouter = require('./routes/user')

const app = express()
app.use(passport.initialize())
require('./passport')(passport)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', userRouter)
app.use('/', boardRouter)
app.use('/', advertRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
