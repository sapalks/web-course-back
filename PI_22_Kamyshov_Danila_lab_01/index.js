const express = require('express')
const parser = require('body-parser').json()
const filestream = require('fs')
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
    logg(req.connection.remoteAddress, req. method, req.url, req.client._httpMessage.statusCode)
});

app.get('/weekday', (req, res) => {
    let date = new Date()
    if(req.query.day < 1 || req.query.day > 31){
        throw new Error('Invalid params')
    }
    res.json({ "weekday": getWeekDay(new Date(date.getFullYear(), date.getMonth(), req.query.day)) });
    logg(req.connection.remoteAddress, req. method, req.url, req.client._httpMessage.statusCode)
});

function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()]
}

app.post('/calc', parser, (req, res) => {
    res.json({ status: "ok", "body": calculate(req.body) })
    logg(req.connection.remoteAddress, req. method, req.url, req.client._httpMessage.statusCode)
})

const calculate = (body) => {
    switch (body.operation) {
        case "subtraction":
            return body.value1 - body.value2;
        case "addition":
            return body.value1 + body.value2;
        case "multiplication":
            return body.value1 * body.value2;
        case "division":
            if(body.value2 === 0){
                throw new Error ("Division by zero")
            }
            return body.value1 / body.value2;
        default:
            throw new Error('Invalid body')
    }
}

const logg = (ip, method, url, status) => {
    filestream.appendFile('logger.log', new Date().toUTCString() + ' ' + ip + ' ' + method + ' ' + url + ' ' + status + "\n", function() {})
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(function (err, req, res, next) {
    res.status(400).send(err.message);
    filestream.appendFile('logger.log', new Date().toUTCString() + ' ' + req.ip + ' ' + req.method + ' ' + req.originalUrl + ' ' + res.statusCode + '\n', function () { });
})