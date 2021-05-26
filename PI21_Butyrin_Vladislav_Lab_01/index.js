const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
const log = 'log.log'
const fs = require('fs')

app.use(bodyParser.json());


app.use(function(req, res, next) {
    fs.appendFile(log, `${new Date().toUTCString()} ${req.ip} ${req.method} http://localhost:3000${req.originalUrl} ${res.statusCode}\n`, () => {});
    next();
});

const dayOfWeek = (day) => {
    switch(day) {
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        case 7:
            return "Sunday"
        default:
            fs.appendFile(log, `${new Date().toUTCString()}` + ' No such day\n', () => {});
            return "No such day";
    }
};

function calculate(val1, val2, oper) {
    let res;

    switch(oper) {
        case 'add':
            res = val1 + val2;
            break;
        case 'mult':
            res = val1 * val2;
            break;
        case 'subtr':
            res = val1 - val2;
            break;
        case 'div':
            if(val2 == 0) {
                fs.appendFile(log,`${new Date().toUTCString()}` + ' Cannot divide by 0\n', () => {});
                return ({status:'Error', body:'Cannot divide by 0'})
            }
            res = val1 / val2
            break;
        default:
            fs.appendFile(log, `${new Date().toUTCString()}` + ' No such operation\n', () => {});
            return ({status:'Error', body:'No such operation'});
    }
    return ({status:"Ok", body: res});
}
app.get('/ping', (req, res) => {
    res.json({ status: 'ok'});
});

app.get('/weekday', (req, res) => {
    let date = new Date();
    let day = date.getDay();
    res.json({weekday: dayOfWeek(day)});
});
app.post('/calc', function (req, res) {
    res.json(calculate(req.body.value1, req.body.value2, req.body.operation));
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
