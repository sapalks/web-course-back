const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const url = require('url');
const Parser = require('body-parser');

app.use(Parser.json());
app.use(Parser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    fs.appendFile('logging.log', new Date().toUTCString() + ' ' + req.ip + ' ' +
        ' ' + req.method + ' ' + ' http://' + req.hostname + ':' + port + req.url + ' ' + res.statusCode + '\n', "utf-8", function (err) {
    });
    next();
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

function Error(message) {
    throw new Error(message);
}

function ErrorLog(error) {
    fs.appendFile('logging.log', 'ERROR:|' + error.message + '|' + error.stack + '\n', "utf-8", function (err) {
    });
}

app.get('/ping', (req, res) => {
    res.json({status: 'ok'});
});

app.get('/weekday', (req, res) => {
    try {
        let urlRequest = url.parse(req.url, true);
        if (urlRequest.query.day === undefined || urlRequest.query.day < 1) {
            Error('Error');
            res.json({status: 'error'});
            return;
        }
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'];
        const newDate = new Date(new Date().getFullYear(), new Date().getMonth(), urlRequest.query.day);
        res.json({weekday: days[newDate.getDay()]});
    } catch (err) {
        res.json({status: 'error'});
        ErrorLog(err);
    }
});

app.post('/calc', (req, res) => {
    try {
        let result = undefined;
        if (isNaN(req.body.value1)) {
            Error('wrong parameters')
        }
        let val1 = parseInt(req.body.value1);
        let val2 = parseInt(req.body.value2);
        if (req.body.operation === 'add') {
            result = val1 + val2;
        }
        if (req.body.operation === 'sub') {
            result = val1 - val2;
        }
        if (req.body.operation === 'mul') {
            result = val1 * val2;
        }
        if (req.body.operation === 'div') {
            result = val1 / val2;
        }
        if (result===null) {
            Error('wrong parameters');
        }
        res.json({status: 'ok', result: result});
    } catch (err) {
        res.json({status: 'error'});
        ErrorLog(err);
    }
});