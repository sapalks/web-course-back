const express = require('express')
const bodyParser = require('body-parser').json()
const winston = require('winston')
const app = express()

const port = 5444

var logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'logger.log',
            handleExceptions: true
        })
    ]
})

app.use((req, res, next) => {
    logger.info(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode);
    next();
});

app.get('/ping', (req, res) => res.json({ status: 'ok' }))

function GETDay(inputDate) {
    if (inputDate > 0 && inputDate < 32) {
        const dayOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        let curDay = new Date()
        curDay.setDate(inputDate)
        return dayOfWeek[curDay.getDay()]
    }
    throw new Error('wrong day')
}

app.get('/weekday', (req, res) => res.json(GETDay(req.query.day)))

function calculate(val1, val2, operation) {
    const existingOperation = ['+', '-', '*', '/']
    switch (existingOperation.indexOf(operation)) {
        case 0:
            return val1 + val2
        case 1:
            return val1 - val2
        case 2:
            return val1 * val2
        case 3:
            return val1 / val2
        default:
            throw new Error('wrong operation')
    }
}

app.post('/calc', bodyParser, (req, res) => {
    res.json({ status: 'ok', body: calculate(req.body.value1, req.body.value2, req.body.operation) })
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port)
})

app.use(function(err, req, res, next) {
    res.status(400).send(err.message);
    logger.error(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode + " " + err.message);
})