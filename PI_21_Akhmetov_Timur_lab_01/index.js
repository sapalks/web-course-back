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

const getCurrentDay = (day) => {
    console.log(day);
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
        case 0:
            return "Sunday"
        default:
            fs.appendFile(log, `${new Date().toUTCString()}` + ' Error, there is no such day\n', () => {});
            return "Error, there is no such day";
    }
};

function calculate(val1, val2, oper) {
    let res;

    if(oper == 'division' && val2 == 0) {
        fs.appendFile(log,`${new Date().toUTCString()}` + ' Error in calc, cannot divide by zero\n', () => {});
        return ({status:'Error', body:'Error in calc, cannot divide by zero'})
    }
    switch(oper) {
        case 'addition':
            res = val1 + val2;
            break;
        case 'multiplication':
            res = val1 * val2;
            break;
        case 'subtraction':
            res = val1 - val2;
            break;
        case 'division':
            res = val1 / val2
            break;
        default:
            fs.appendFile(log, `${new Date().toUTCString()}` + ' Error in calc, there is no such operation\n', () => {});
            return ({status:'Error', body:'Error in calc, there is no such operation'});
    }
    return ({status:"Ok", body: res});
}
app.get('/ping', (req, res) => {
    res.json({ status: 'ok'});
});

app.get('/weekday', (req, res) => {
    let date = new Date();
    let day = date.getDay();
    res.json({weekday: getCurrentDay(day)});
});
app.post('/calc', function (req, res) {
    res.json(calculate(req.body.value1, req.body.value2, req.body.operation));
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
