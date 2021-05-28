const express = require('express')
const parser = require('body-parser').json()
const winston = require('winston')
const app = express()
const port = 3000

var logger = winston.createLogger({
    format: winston.format.json (),
    transports: [
        new winston.transports.File({
            filename: 'logger.log',
            handleExceptions: true
        })
    ]
})

function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()]
}

const calculate = (body) => {
    switch (body.operation) {
        case "subtraction":
            return body.value1 - body.value2;
        case "addition":
            return body.value1 + body.value2;
        case "multiplication":
            return body.value1 * body.value2;
        case "division":
            if(body.value2 === 0){
                throw new Error ("Division by zero")
            }
            return body.value1 / body.value2;
        default:
            throw new Error('Invalid body')
    }
}

app.use((req, res, next) => {
    logger.info(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode);
    next();
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/weekday', (req, res) => {
    let date = new Date()
    if(req.query.day < 1 || req.query.day > 31){
        throw new Error('Invalid params')
    }
    res.json({ "weekday": getWeekDay(new Date(date.getFullYear(), date.getMonth(), req.query.day)) });
});

app.post('/calc', parser, (req, res) => {
    res.json({ status: "ok", "body": calculate(req.body) })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(function (err, req, res, next) {
    res.status(400).send(err.message);
    logger.error(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode + " " + err.message);
})