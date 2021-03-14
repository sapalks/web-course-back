const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
const jsonParser = require('body-parser').json()

const getDayOfTheWeek = (dayNum) => {
    const date = new Date()
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[new Date(date.getFullYear(), date.getMonth(), dayNum).getDay()]
}

const logger = (req) => {
    fs.appendFile('log.log', `${new Date().toUTCString()} ${req.connection.remoteAddress} ${req.method} ${req.url} ${req.client._httpMessage.statusCode}\n`, function () { })
}

const calculator = (numb1, numb2, operation) => {
    switch (operation) {
        case "division":
            return numb1 / numb2
        case "multipli":
            return numb1 * numb2
        case "addition":
            return numb1 + numb2
        case "subtraction":
            return numb1 - numb2
        default:
            throw new Error("invalid operation")
    }
}

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() })
    logger(req)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/weekday', (req, res) => {
    const dayNum = req.query.day
    if (dayNum < 1 || dayNum > 31)
        throw Error("invalid number")
    res.json({ "weekday": getDayOfTheWeek(dayNum) })
    logger(req)
})

app.post('/calc', jsonParser, (req, res) => {
    res.json({ "calc": calculator(req.body.value1, req.body.value2, req.body.operation) })
    logger(req)
})

app.use(function (err, req, res, next) {
    res.status(400).send(err.message)
    fs.appendFile('log.log', `error ${new Date().toUTCString()} ${req.ip} ${req.method} ${req.url} ${res.statusCode}\n`, () => { })
}) 