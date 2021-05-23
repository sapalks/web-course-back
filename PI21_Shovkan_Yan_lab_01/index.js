const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require("fs");

app.use(bodyParser.json());

app.use((req, res, next) => {
    fs.appendFile("mylog.log", (new Date().toUTCString() + " " + req.ip + " " + req.method + " http://localhost:3000" + req.originalUrl + " " + res.statusCode + "\n"), function(){});
    next();
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok'});
})

app.get('/weekday', (req, res) => {
    let day = req.query.day;

    if(day < 1 || day > 31){
        res.json({status: 'error', body : 'day must be <=31 && >=1'});
    }

    let currentDate = new Date();
    currentDate.setDate(day);
    
    let daytxt;

    switch(currentDate.getDay()){
        case 0:
            daytxt = 'Sunday';
            break;
        case 1:
            daytxt = 'Monday';
            break;
        case 2:
            daytxt = 'Tuesday';
            break;
        case 3:
            daytxt = 'Wednesday';
            break;
        case 4:
            daytxt = 'Thursday';
            break;
        case 5:
            daytxt = 'Friday';
            break;
        case 6:
            daytxt = 'Saturday';
            break;
    }

    res.json({ "weekday": daytxt});
})

app.post('/calc', (req, res) => {
    let value1 = req.body.value1;
    let value2 = req.body.value2;
    let result;

    switch(req.body.operation) {
        case '+':
            result= value1 + value2;
            res.json(result);
            break;
        case '-':
            result = value1 - value2;
            res.json(result);
            break;
        case '*':
            result = value1 * value2;
            res.json(result);
            break;
        case '/':
            result = value1 / value2;
            res.json(result);
            break;
    }

 });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})