const express = require('express')
const personparser = require('body-parser')

const fs = require('fs')
const app = express()
const log = 'log.txt'
const port = 8040
app.use(personparser.json());
app.use((req, res, next) => {
    fs.appendFile(log, `{${new Date().toUTCString()}} {${req.ip}} {${req.method}} 
    {${req.url}} {${res.statusCode}}\n`, () => { })
    next();
})
app.get('/ping', (req, res) => res.json({ status: 'Is running' }))
app.get('/weekdays', (req, res) => {
    const day = Number(req.query.day);
    if (day >= 1 && day < 32 && day != null) {
        res.json({
            weekday: getWeekday(day)
        });
    } else {
        throw new Error("Wrong, no Day");
    }
});
function getWeekday(insertDate) {
    const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',
    ];
    var date = new Date(new Date().getFullYear(), new Date().getMonth(), insertDate)
    return weekDays[date.getDay()];
}
app.listen(port, () => fs.appendFile(log, new Date().toUTCString() + 
 ' ' + 'The server running on at http://localhost:' + port + '\n', () => { }))

app.post('/calculate', (req, res) => {
    res.json({ status: 'Is running', body: calc(req.body.n1, req.body.n2, req.body.operation) })
})
function calc(Number1, Number2, operation) {
    const op = [ 'addition', 'subtraction', 'multiplication', 'division'];
    switch (op.indexOf(operation)) {
        case 0: 
            return Number1 + Number2;
        case 1: 
            return Number1 - Number2;
        case 2: 
            return Number1 * Number2;
        case 3: 
            return Number1 / Number2;
        default: 
            throw new Error('Invalid operation!');
    }
}
app.use((err, req, res, next) => {
    res.status(400).send(err.message)
    fs.appendFile(log, `{${new Date().toUTCString()}} {${req.ip}} {${req.method}} 
     {${req.url}} {${res.statusCode}}\n + ${err.stack}\n`, () => { })
})