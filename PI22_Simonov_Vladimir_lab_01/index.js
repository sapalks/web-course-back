const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('winston');
const port = 3000;

const configLog = {
	transports: [
		new winston.transports.File({
			filename: './logs/log.log',
			handleExceptions: true
		})
	]
};

const logger = winston.createLogger(configLog);

app.use(bodyParser.json());

app.use((req, res, next) => {
	logger.info(`${new Date().toUTCString()}, ${req.ip}, ${req.method}, ${req.url}, ${res.statusCode}`);
	next();
});

app.get('/ping', (req, res) => {
	res.json({ status: 'ok' });
})

app.get('/weekday', (req, res) => {
	res.json({ weekday: getDayOfWeek(req, res) })
})

app.post('/calculate', (req, res) => {
	res.json({ status: 'ok', "body": calculate(req, res) });
})

function getDayOfWeek(req, res) {
	if (req.query.day < 1 || req.query.day > 31) {
		throw new Error("Incorrect day");
	}
	let day = new Date();
	day.setDate(req.query.day);
	let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	return daysOfWeek[day.getDay()];
}

function calculate(req, res) {
	let digit1 = req.body.digit1;
	let digit2 = req.body.digit2;
	let operation = req.body.operation;
	let result;
	switch (operation) {
		case "addition":
			return result = digit1 + digit2;
		case 'subtraction':
			return result = digit1 - digit2;
		case 'multiplication':
			return result = digit1 * digit2;
		case 'division':
			if (req.body.digit2 === 0) {
				return ({ status: 'error', error: 'division by zero' })
			}
			return result = digit1 / digit2;
		default:
			throw new Error("Incorrect operation")
	}
}

app.listen(port, () => {
	console.log(`Server start at http://localhost:${port}`)
})

app.use(function (err, req, res, next) {
	res.status(400).send(err.message);
	logger.error(`${new Date().toUTCString()}, ${req.ip}, ${req.method}, ${req.url}, ${res.statusCode}`);
})