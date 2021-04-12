const express = require('express')
const bodyParser  = require('body-parser');
const app = express()
const port = 3000
const winston = require('winston')

app.use(bodyParser.json()); 

const logConfig = {
    transports: [
        new winston.transports.File({
            filename: './logs/logFile.log',
            handleExceptions: true
        })
    ]
};

const logger = winston.createLogger(logConfig);

app.use((req, res, next) => {
    logger.info(`${new Date().toUTCString()}, ${req.ip}, ${req.method}, ${req.url}, ${res.statusCode}`);
    next();
});

app.use(function (err, req, res, next) {
    res.status(400).send(err.message);
    logger.error(`${new Date().toUTCString()}, ${req.ip}, ${req.method}, ${req.url}, ${res.statusCode}`);
});

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

function calculate (num1, num2, operation) {
    var result;
    switch (operation) {
        case "addition":
            result = num1 + num2;
            break;
        case 'subtraction':
            result = num1 + num2;
            break;
        case 'multiplication':
            result = num1 * num2;
            break;
        case 'division':
            if (num2 === 0) {
                return ({status:'error', body:'division by zero is not allowed'})
            }
            result = num1 / num2;
            break;
        default:
            return ({status:'error', body:'incorrect operation'})
    }
    return {status:'ok', body:result};
}

function getDayOfTheWeek(date) {
    let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return daysOfTheWeek[date.getDay()]
}

app.get('/weekday', (req, res) => {
    if(req.query.day < 1 || req.query.day > 31){
        throw new Error('Incorrect value for day')
    }
    var date = new Date()
    res.json({'weekday' : getDayOfTheWeek(new Date(date.getFullYear(), date.getMonth(), req.query.day)) });
});

app.post('/calc', (req, res) => {
    res.json(calculate(req.body.num1, req.body.num2, req.body.operation));
});