const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const url = require('url');
const now = new Date();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    fs.appendFile('readme.log', '{' + new Date().toUTCString() + '}' + ' {' + req.ip + '}' +
        ' {' + req.method + '}' + ' {http://' + req.hostname + ':' + port + req.url + '}' + ' {' + res.statusCode + '}\n', "utf-8", function (err) {
    });
    next();
});

app.get('/ping', (req, res) => {
    res.json({status: 'ok'});
});

app.get('/weekday', (req, res) => {
    try {
        let urlRequest = url.parse(req.url, true);
        if (urlRequest.query.day === undefined || urlRequest.query.day < 1) {
            callback('Incorrect input');
            res.json({status: 'error'});
            return;
        }
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const newDate = new Date(now.getFullYear(), now.getMonth(), urlRequest.query.day);
        res.json({weekday: days[newDate.getDay()]});
    } catch (err) {
        res.json({status: 'error'});
        loggerError(err);
    }
});

app.post('/calc', (req, res) => {
    try {
        switch (req.body.operation) {
            case 'addition':
                res.json({status: 'ok', result: parseInt(req.body.value1) + parseInt(req.body.value2)});
                break;
            case 'subtraction':
                res.json({status: 'ok', result: req.body.value1 - req.body.value2});
                break;
            case 'multiplication':
                res.json({status: 'ok', result: req.body.value1 * req.body.value2});
                break;
            case 'division':
                res.json({status: 'ok', result: req.body.value1 / req.body.value2});
                break;
            default:
                callback('Incorrect input');
        }
    } catch (err) {
        res.json({status: 'error'});
        loggerError(err);
    }

});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

function callback(message) {
    throw new Error(message);
}

function loggerError(error) {
    fs.appendFile('readme.log', '***ERROR:|' + error.message + '|' + error.stack + '\n', "utf-8", function (err) {
    });
}
