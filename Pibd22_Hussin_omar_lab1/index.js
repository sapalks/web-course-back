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

function getDayOfWeek(insertDate) {
    if (insertDate > 0 && insertDate< 16) {
        const dayOfWeek = [  'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        let currentDate = new Date()
        currentDate.setDate(insertDate)
        return dayOfWeek[currentDate.getDay()]
    }
    throw new Error('No day')
}

app.get('/ping', (req, res) => res.json({ status: 'ok' }))

app.get('/weekday', (req, res) => res.json(getDayOfWeek(req.query.day)))

app.listen(port, () => fs.appendFile(pathLogFile, new Date().toUTCString() + ' ' + 'Server running on at hhtp://localhost:' + port + '\n', () => { }))

app.post('/calculate', (req, res) => {
    res.json({ status: 'ok', body: calc(req.body.value1, req.body.value2, req.body.operation) })
})

function calc(NomerFirst, NomerSecond, operation) {
    const existingOperation = [ 'subtraction','addition', 'multiplication', 'division']
    switch (existingOperation.indexOf(operation)) {

        case 0: return NomerFirst - NomerSecond
        case 1: return NomerFirst + NomerSecond
        case 2: return NomerFirst * NomerSecond
        case 3: return NomerFirst / NomerSecond
        default: throw new Error('smth went wrong')
    }
}
app.use((err, req, res, next) => {
    res.status(400).send(err.message)
    fs.appendFile(pathLogFile, `{${new Date().toUTCString()}} {${req.ip}} {${req.method}} {${req.url}} {${res.statusCode}}\n + ${err.stack}\n`, () => { })
})
