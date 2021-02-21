const express = require('express')
const app = express()
const port = 3000
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const bodyParser = require('body-parser');
const { text } = require('express');
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/ping', (req, res) => {
    res.json({ "status": "ok" });
});

app.use(function(req,res,next)
{
    fs.appendFile(`log.log`, `${new Date().toUTCString()} ${req.ip} ${req.method} http://localhost:3000${req.originalUrl} ${res.statusCode}\n`, function () { });
    next();
});

app.use(function(error,req,res,next)
{
    fs.appendFile(`log.log`, `${new Date().toUTCString()} ${req.ip} ${req.method} http://localhost:3000${req.originalUrl} ${res.statusCode}\n`, function () { });
    res.status(400).send(error.message);
});

app.get('/weekday', (req, res) => {
    var date = new Date(); 
    var time = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() - time);
    res.json({ weekday : getDay(date.getUTCDay())});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

var getDay = (date) => {
    return days[date];
}

var calculation = (value1, value2, operation) =>{
    var result;
    switch (operation) {
        case 'addition':
            result = value1 + value2
            break;
        case 'subtraction':
            result = value1 - value2
            break;
        case 'multiplication':
            result = value1 * value2
            break;
        case 'division':
            result = value1 / value2
            break;
        default:
            return ({status:'error', body:'dont understand operation ' + operation})
    }
    return {status:'ok',body:result};
}

app.post('/сalc', function (req, res) {
    if (Object.keys(req.body).length == 0) {
        res.json({status: 'error', body : 'ERROR'});
    }
    res.send(calculation(req.body.value1, req.body.value2, req.body.operation));
})

