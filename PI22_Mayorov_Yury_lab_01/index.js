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
	let date = new Date();
	if (Number(req.query.day) < 1 || Number(req.query.day) > 31) {
		throw new Error("Сhoose a day from 1 to 31")
	}
	res.json({ 'weekday': peekDay(new Date(date.getFullYear(), date.getMonth(), req.query.day)) });
	logger(req.connection.remoteAddress, req.method, req.url, req.client._httpMessage.statusCode)
});

function peekDay(date) {
	const arrayDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
	'Thursday', 
	'Friday', 
	'Saturday']

	switch(date) {
		default:
			return arrayDay[date.getDate()]
	}
}

app.post('/calc', bp, (req, res) =>  {
	let body = req.body
	res.json({ status: 'ok', "body": calculate(body) });
	logger(req.connection.remoteAddress, req.method, req.url, req.client._httpMessage.statusCode)
});

const calculate = (body) => {
	switch(body.operation) {
		case "subtraction":
			return body.digit1 + body.digit2
		case "addition":
			return body.digit1 - body.digit2
		case "multiplication":
			return body.digit1 * body.digit2
		case "division":
			if (body.digit2 === 0) {
				return ({ status: 'error', body: 'division by zero' })
			}
			return body.digit1 / body.digit2
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