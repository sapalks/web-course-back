const fs = require('fs')
const express = require('express')
const jsonParser = require('body-parser').json()
const app = express()
const port = 3000

const replaceDay = (date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[date.getDay()]
}

const calc = ({ value1, value2, operation }) => {
    switch (operation) {
        case "subtraction":
            return value1 - value2
        case "addition":
            return value1 + value2
        case "multiplication":
            return value1 * value2
        case "division":
            return value1 + value2
        default:
            return "smth went wrong"
    }
}

const logger = ({ connection, method, url, client }) => {
    fs.appendFile('log.log', `${new Date().toUTCString()} ${connection.remoteAddress} ${method} ${url} ${client._httpMessage.statusCode}\n`, function () { })
}

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
    logger(req)
});

app.get('/weekday', (req, res) => {
    const date = new Date()
    const day = req.query.day

    if (day < 1 || day > 31)
        throw new Error('Bad params')

    res.json({ "weekday": replaceDay(new Date(date.getFullYear(), date.getMonth(), day)) })
    logger(req)

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/calc', jsonParser, (req, res) => {

    if (Object.keys(req.body).length == 0)
        throw new Error('Body is empty')

    res.json({ status: 'ok', 'body': calc(req.body) })
    logger(req)
})

app.use(function (err, req, res, next) {
    res.status(500).send('Internal Server Error!')
    fs.appendFile('log.log', new Date().toUTCString() + ' error status: 500, Iternal server error \n', function () { })
});