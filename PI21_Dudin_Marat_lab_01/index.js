const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const file = 'log.log'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working at http://localhost:${port}`)
});

app.use(function(req, res, next) {
    fs.appendFile(file, `${new Date()} ${req.ip} ${req.method} http://localhost:3000${req.originalUrl} ${res.statusCode}\n`, function () { });
    next();
});

function getCurrentDay(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}

function calc(value1, value2, operation) {
    switch(operation) {
        case "addition":
            return value1 + value2
        case "subtraction":
            return value1 - value2
        case "multiplication":
            return value1 * value2
        case "division":
            return value1 / value2
        default:
            return {status: 'error', body : 'такая операция не существует'};
    }
}

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/weekday', (req, res) => {
    const date = new Date();
    res.json({weekday : getCurrentDay(date.getDay())});
});

app.post('/calc', (req, res) => {

    if (req.body.value1 == '' || req.body.value2 == '') {
        res.json({status: 'error', body : 'укажите значение чисел'});
    } else if(req.body.operation == '') {
        res.json({status: 'error', body : 'укажите операцию'});
    }
    res.json({ status: 'ok', body : calc(req.body.value1, req.body.value2, req.body.operation)});
});

app.use(function (err, req, res, next) {
    res.status(400).send(err.message);
    fs.appendFile(file, `${new Date()} ${req.ip} ${req.method} http://localhost:3000${req.originalUrl} ${res.statusCode}\n`, function () { });
});