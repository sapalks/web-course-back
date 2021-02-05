var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
const { format } = require('winston');
const { printf } = format;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var logger = winston.createLogger({
    format: printf(({message}) => {
        return ` ${message}`;
    }),
    transports: [
        new winston.transports.File({
            filename: 'logs.log',
            handleExceptions: true
        })
    ]
})

app.listen(8080, function () {
    logger.info("{" + new Date().toUTCString() + "} Server started on port 8080")
})

var logging = function (req, res, next) {
    logger.info("{" + new Date().toUTCString() + "} {" + req.ip + "} {" + req.method + "} {" + req.protocol + '://' + req.get('host') + req.originalUrl + "} {" + res.statusCode + "}");
    next();
};

app.use(logging);

var dayOfTheWeek = function (day) {

    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

    var date = new Date();
    var answer = new Date(date.getFullYear(), date.getMonth(), day);
    return days[answer.getDay()]
}

var calculate = function (value1, value2, operation) {
    var result;
    switch (operation) {
        case 'addition':
            result = value1 + value2
            break;
        case 'subtraction':
            result = value1 - value2
            break;
        case 'multiplication':
            result = value1 * value2
            break;
        case 'division':
            result = value1 / value2
            break;
        default:
            return ({status:'error', body:'dont understand operation ' + operation})
    }

    if (!Number.isFinite(result)) {
        return({status:'error', body:'incorrect values'})
    }

    return {status:'ok',body:result};
}

app.get('/ping', function (req, res) {
    res.send({
        status: 'ok'
    })
})

app.get('/weekday', function (req, res) {
    if (Number(req.query.day) < 1 || Number(req.query.day) > 31) {
        throw new Error("incorrect values")
    }
    res.send(dayOfTheWeek(Number(req.query.day)));
})

app.post('/calc', function (req, res) {
    res.send(calculate(req.body.value1, req.body.value2, req.body.operation));
})

app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});