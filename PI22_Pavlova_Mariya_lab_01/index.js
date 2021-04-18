const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const winston = require('winston');
const port = process.env.PORT || 5000

const logConfiguration = {
    transports: [
        new winston.transports.File({
            filename: './logs/logFile.log',
            handleExceptions: true
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

app.listen(port, () => {
    console.log('Server has been started');
})

app.use(bodyParser.json());

app.use((req, res, next) => {
    logger.info(`${new Date().toUTCString()}, ${req.ip}, ${req.method}, ${req.url}, ${res.statusCode}`);
    next();
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
})

app.get('/weekday', (req, res) => {
    res.json({ weekday:  getDayOfWeek(req, res)})
})

app.post('/calc', (req, res) => {
    res.json({ status: 'ok', "body": calc(req, res) });
})

function getDayOfWeek(req, res) {
    if (req.query.day < 1 || req.query.day > 31) {
        throw new Error("Invalid day");
    }
    let day  = new Date();
    day.setDate(req.query.day);
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return daysOfWeek[day.getDay()];
}

function calc (req, res) {
    let value1 = req.body.value1;
    let value2 = req.body.value2;
    let operation = req.body.operation;
    let result;
    switch (operation) {
        case "addition":
            result = value1 + value2;
            break;
        case 'subtraction':
            result = value1 - value2;
            break;
        case 'multiplication':
            result = value1 * value2;
            break;
        case 'division':
            result = value1 / value2;
            break;
        default:
            throw new Error("Invalid operation")
    }
    return result;
}

app.use(function (err, req, res, next) {
    res.status(400).send(err.message);
    logger.error(`${new Date().toUTCString()}, ${req.ip}, ${req.method}, ${req.url}, ${res.statusCode}`);
})
