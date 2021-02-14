const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

const pathLogFile = 'logfile.txt'
const port = 5294

app.use(bodyParser.json());

app.use((req, res, next) => {
    fs.appendFile(pathLogFile, `{${new Date().toUTCString()}} {${req.ip}} {${req.method}} {${req.url}} {${res.statusCode}}\n`, () => { })
    next();
})

function getDayOfWeek(introducedDate) {
    if (introducedDate > 0 && introducedDate < 32) {
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let currentDate = new Date()
        currentDate.setDate(introducedDate)
        return dayOfWeek[currentDate.getDay()]
    }
    throw new Error('wrong day')
}

app.get('/ping', (req, res) => res.json({ status: 'ok' }))

app.get('/weekday', (req, res) => res.json(getDayOfWeek(req.query.day)))

app.listen(port, () => fs.appendFile(pathLogFile, new Date().toUTCString() + ' ' + 'Server running on at hhtp://localhost:' + port + '\n', () => { }))

app.post('/calc', (req, res) => {
    res.json({ status: 'ok', body: calculate(req.body.value1, req.body.value2, req.body.operation) })
})

function calculate(valFirst, valSecond, operation) {
    const existingOperation = ['addition', 'subtraction', 'multiplication', 'division']
    switch (existingOperation.indexOf(operation)) {
        case 0: return { status: 'ok', body: valFirst + valSecond }
        case 1: return { status: 'ok', body: valFirst - valSecond }
        case 2: return { status: 'ok', body: valFirst * valSecond }
        case 3: return { status: 'ok', body: valFirst - valSecond }
        default: throw new Error('wrong operation')
    }
}

app.use((err, req, res, next) => {
    res.status(400).send(err.message)
    fs.appendFile(pathLogFile, `{${new Date().toUTCString()}} {${req.ip}} {${req.method}} {${req.url}} {${res.statusCode}}\n + ${err.stack}\n`, () => { })
})