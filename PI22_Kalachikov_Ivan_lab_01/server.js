var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const myFormat = printf(({ level, message, timestamp }) => {
    return `{${timestamp}} ${message}`;
  });

var logger = winston.createLogger({
    format: combine(
        timestamp(),
        myFormat
      ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs.log',
        })
      ]
})

app.listen(8080, function () {
    logger.info("Server started on port 8080")
})

var logging = function (req, res, next) {
    logger.info("{" + req.ip + "} {" + req.method + "} {" + req.protocol + '://' + req.get('host') + req.originalUrl + "} {" + res.statusCode + "}");
    next();
};
  
app.use(logging);

app.get('/ping', function (req, res) {
    res.send({
        status: 'ok'
    })
})

app.get('/weekday', function (req, res) {
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
    var answer = new Date(date.getFullYear(), date.getMonth(), req.query.day);
    res.send('<h1>' + days[answer.getDay()] + '</h1>');
})

app.post('/calc', function (req, res) {
    var result;
    switch (req.body.operation) {
        case 'addition':
            result = Number(req.body.value1) + Number(req.body.value2)
            break;
        case 'subtraction':
            result = Number(req.body.value1) - Number(req.body.value2)
            break;
        case 'multiplication':
            result = Number(req.body.value1) * Number(req.body.value2)
            break;
        case 'division':
            result = Number(req.body.value1) / Number(req.body.value2)
            break;
        default:
            res.send({status:'error', body:'dont understand operation ' + req.body.operation})
            return;
    }

    if (!Number.isFinite(result)) {
        res.send({status:'error', body:'incorrect values'})
        return;
    }

    res.send({status:'ok', body:result});
})