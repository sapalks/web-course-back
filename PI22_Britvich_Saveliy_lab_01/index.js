const express = require('express')
const app = express()
const port = 3000
const bp = require('body-parser').json()
const fs = require('fs')

const logger = (ip, method, url, status) => {
	fs.appendFile('log.log', new Date().toUTCString() + ' ' + ip + ' ' + method + ' ' + url + ' ' + status + "\n", function () { })
}

app.get('/ping', (req, res) => {
	res.json({ status: 'ok'});
	logger(req.connection.remoteAddress, req.method, req.url, req.client._httpMessage.statusCode)
});

app.get('/weekday', (req, res) => {
    res.json({ weekday:  getDayOfWeek(req, res)})
});


app.post('/calc', bp, (req, res) =>  {
	let body = req.body
	res.json({ status: 'ok', "body": calculate(body) });
	logger(req.connection.remoteAddress, req.method, req.url, req.client._httpMessage.statusCode)
});
function getDayOfWeek(req, res) {
    if (req.query.day < 1 || req.query.day > 31) {
        throw new Error("Invalid day");
    }
    let day  = new Date();
    day.setDate(req.query.day);
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
    return daysOfWeek[day.getDay()];
};

const calculate = (body) => {
	switch(body.operation) {
		case "subtraction":
			return body.number1 + body.number2
		case "addition":
			return body.number1 - body.number2
		case "multiplication":
			return body.number1 * body.number2
		case "division":
			if (body.number2 === 0) {
				return ({ status: 'error', body: 'division by zero' })
			}
			return body.number1 / body.number2
		default:
			return ({ status: 'error', body: 'incorrect operation ' + body.operation })
	}
};

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}` + `/ping`)
})

app.use((error, req, res, next) => {
	fs.appendFile('log.log', new Date().toUTCString() + ' error status: 500, error on server \n', function () { })
	res.status(400).send(err.message)
})