const express = require('express')
const personparser = require('body-parser')

const fs = require('fs')
const app = express()
const pathLogFile = 'logfile.txt'
const port = 6000
app.use(personparser.json());
app.use((req, res, next) => {
    fs.appendFile(pathLogFile, `{${new Date().toUTCString()}} {${req.ip}} {${req.method}} {${req.url}} {${res.statusCode}}\n`, () => { })
    next();
})
app.get('/ping', (req, res) => res.json({ status: 'ok' }))
app.get('/weekday', (req, res) => {
    const day = Number(req.query.day);
    if (day > 0 && day < 32 && day != null) {
        res.json({
            weekday: getWeekday(day)
        });
    } else {
        throw new Error("No Day")
    }
});
function getWeekday(insertDate) {
    const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',
    ];
    var date = new Date(new Date().getFullYear(), new Date().getMonth(), insertDate)
    return weekDays[date.getDay()];
}
app.listen(port, () => fs.appendFile(pathLogFile, new Date().toUTCString() + ' ' + 'Server running on at http://localhost:' + port + '\n', () => { }))

app.post('/calculate', (req, res) => {
    res.json({ status: 'ok', body: calc(req.body.first, req.body.second, req.body.operation) })
})
function calc(NumberFirst, NumberSecond, operation) {
    const existingOperation = [ 'subtraction','addition', 'multiplication', 'division']
    switch (existingOperation.indexOf(operation)) {

        case 0: return NumberFirst - NumberSecond
        case 1: return NumberFirst + NumberSecond
        case 2: return NumberFirst * NumberSecond
        case 3: return NumberFirst / NumberSecond
        default: throw new Error('smth went wrong')
    }
}
app.use((err, req, res, next) => {
    res.status(400).send(err.message)
    fs.appendFile(pathLogFile, `{${new Date().toUTCString()}} {${req.ip}} {${req.method}} {${req.url}} {${res.statusCode}}\n + ${err.stack}\n`, () => { })
})