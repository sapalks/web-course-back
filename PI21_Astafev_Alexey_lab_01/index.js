const { response } = require('express');
const express = require('express')
const bodyParser = require("body-parser");
const fs = require("fs")
const datajs = require("./data");
const app = express();
const port = 3000;
var result;
// создаем парсер
const urlencodedParser = bodyParser.urlencoded({extended: false});

//логирование
app.use((req, res, next) => {
    var data = `${new Date().toUTCString()} ${req.ip} ${req.method} http://localhost:3000${req.originalUrl} ${res.statusCode}\n`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});

//Простые математические операции
app.get("/calc", urlencodedParser, function (req, res) {
    res.sendFile(__dirname + "/calc.html");
});
app.post("/calc", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var value1 = parseInt(req.body.value1);
    var value2 = parseInt(req.body.value2);
    console.log(req.body);
    if(req.body.operation == "subtraction"){
        result = value1 - value2;
    }
    else if(req.body.operation == "addition"){
        result = value1 + value2;
    }
    else if(req.body.operation == "division"){
        result = value1 / value2;
    }
    else if(req.body.operation == "multiplication"){
        result = value1 * value2;
    }
    else{
        res.send({status: 'error', body : 'this operation not exist'});
        return;
    }
    res.send(`${req.body.operation} : ${result}`);
});

//вывод текста по маршруту
app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

//вывод дня недели текущего месяца
app.get('/weekday', (req, res) => {
    let day = req.query.day;
    if(day <= 1 || day <= 31){
        res.send({ "weekday": datajs.getCurrentDate(day)});
    }
    throw new Error('wrong day')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

