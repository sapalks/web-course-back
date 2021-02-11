const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')
const file = 'log.log'

const getCurrentDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date];
}

const calc = ({value1, value2, operation}) => {
    switch(operation) {
        case "addition":
            return value1 + value2
        case "subtraction":
            return value1 - value2
        case "multiplication":
            return value1 * value2
        case "division":
            return value1 + value2
        default:
            return {status: 'error', body : 'this operation not exist O_o'};
    }
}

const myLogger = (req, res) => {
    fs.appendFile(file, `${new Date().toUTCString()} ${req.ip} ${req.method} http://localhost:3000${req.originalUrl} ${res.statusCode}\n`, function () { });
}

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
    myLogger(req, res);
});

app.get('/weekday', (req, res) => {

    const date = new Date();
    var timezoneOffset = date.getTimezoneOffset() / 60;

    date.setHours(date.getHours() - timezoneOffset);
    res.json({ weekday : getCurrentDay(date.getDay()) });
    myLogger(req, res);
});

app.use(bodyParser.json());

app.post('/calc', (req, res) => {

    if (Object.keys(req.body).length == 0) {
        res.json({status: 'error', body : 'it is empty here O_o'});
    }
    res.json({ status: 'ok', body : calc(req.body.value1, req.body.value2, req.body.operation)});
    myLogger(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.use(function (err, req, res, next) {
    res.status(500).send('Server exception');
    fs.appendFile(file, new Date().toUTCString() + ' error status: 500, Server exception \n', function () { });
});