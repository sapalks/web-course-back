const express = require('express')
const jsonParser = require('body-parser').json()
const winston = require('winston');
const app = express()
const port = 3000

var logger = winston.createLogger({
    format: winston.format.json (),
    transports: [
        new winston.transports.File({
            filename: 'lab1_log.log',
            handleExceptions: true
        })
    ]
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use((req, res, next) => {
    logger.info(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode);
    next();
});

app.get('/ping', (req, res) => {
    res.json({
        status: 'ok'
    });
});

app.get('/weekday', (req, res) => {
    var day = Number(req.query.day);
    if (day > 0 && day < 32 && day != null) {
        res.json({
            weekday: getWeekday(day)
        });
    } else {
        throw new Error("День выбран некорректно.")
    }
});

app.post('/calc', jsonParser, (req, res) => {
    res.json({
        status: 'ok',
        body: calculate(req.body)
    });
})

function getWeekday(num) {
    var weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    var date = new Date(new Date().getFullYear(), new Date().getMonth(), num)
    return weekDays[date.getDay()];
}

function calculate({
    value1,
    value2,
    operation
}) {
    switch (operation) {
        case 'subtraction':
            return value1 - value2;
        case 'addition':
            return value1 + value2;
        case 'multiplication':
            return value1 * value2;
        case 'division':
            if (value2 == 0) {
                throw new Error("Деление на ноль.")
            }
            return value1 / value2;
        default:
            throw new Error("Данные введенны некорректно.")
    }
}

app.use((err, req, res, next) => {
    res.status(400).send(err.message);
    logger.error(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode + " " + err.message);
});   