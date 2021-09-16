const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const fs = require("fs");

app.use(bodyParser.json());

app.use((req, res, next) => {
    fs.appendFile("log.log", (new Date().toUTCString() + " " + req.ip + " " + req.method + " http://localhost:3000" + req.originalUrl + " " + res.statusCode + "\n"), function(){});
    next();
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/weekday', (req, res) => {
    const date = new Date();
    date.setDate(req.query.day);

    switch(date.getDay()) {
        case 0:  
            res.json({ weekday: 'Sunday' })
            break;
        case 1:  
            res.json({ weekday: 'Monday' })
            break;
        case 2:  
            res.json({ weekday: 'Tuesday' })
            break;
        case 3:  
            res.json({ weekday: 'Wednesday' })
            break;
        case 4:  
            res.json({ weekday: 'Thursday' })
            break;
        case 5:  
            res.json({ weekday: 'Friday' })
            break;
        case 6:  
            res.json({ weekday: 'Saturday' })
            break;
        default:
            res.json('Somthing goes wrong :(');
            break;
    }
});

app.post('/calc', (req, res) => {
    value1 = Number(req.body.value1);
    value2 = Number(req.body.value2);

    switch (req.body.operation) {
        case 'addition':
            res.json({ status: 'ok', result: value1 + value2 });
            break;
        case 'subtraction':
            res.json({ status: 'ok', result: value1 - value2 });
            break;
        case 'multiplication':
            res.json({ status: 'ok', result: value1 * value2 });
            break;
        case 'division':
            res.json({ status: 'ok', result: value1 / value2 });
            break;
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})