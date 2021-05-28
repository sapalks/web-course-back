const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
const file = 'logging.log'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    fs.appendFile(file, '{' + new Date().toUTCString() + '}' + ' {' + req.ip + '}' +
        ' {' + req.method + '}' + ' {http://' + req.hostname + ':' + port + req.url + '}' + ' {' + res.statusCode + '}\n', "utf-8", function (err) {
        });
    next();
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/weekday', (req, res) => {
    try {
        let urlRequest = url.parse(req.url, true);
        if (urlRequest.query.day === undefined || urlRequest.query.day < 1 || urlRequest.query.day > 31) {
            res.json({ status: 'Incorrect day input' });
            return;
        }
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var now = new Date();
        const newDate = new Date(now.getFullYear(), now.getMonth(), urlRequest.query.day);
        res.json({ weekday: days[newDate.getDay()] });
    } catch (err) {
        res.json({ status: 'error' });
        loggerError(err);
    }
});

app.post('/calc', (req, res) => {
    try {
        switch (req.body.operation) {
            case 'addition': case 'sum': case '+':
                res.json({ result: parseInt(req.body.value1) + parseInt(req.body.value2) });
                break;
            case 'subtraction': case 'sub': case '-':
                res.json({ result: req.body.value1 - req.body.value2 });
                break;
            case 'multiplication': case 'mult': case '*':
                res.json({ result: req.body.value1 * req.body.value2 });
                break;
            case 'division': case 'div': case '%': case ':':
                res.json({ result: req.body.value1 / req.body.value2 });
                break;
            default:
                throw new Error("Post Calc error");
                loggerError(err);
        }
    } catch (err) {
        res.json({ status: 'error' });
        loggerError(err);
    }


});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

function loggerError(error) {
    fs.appendFile(file, '***ERROR:|' + error.message + '|' + error.stack + '\n', "utf-8", function (err) {
    });
}