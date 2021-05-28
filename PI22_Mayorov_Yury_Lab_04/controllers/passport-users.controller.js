const passportUsers = require('../models/passport-users.model.js');

exports.register = (req, res) => {
	const newUser = {
		Login: req.body.Login,
		Password: req.body.Password
	};

	passportUsers.register(newUser, (err, data) => {
		if (err) {
			if (err.kind === "login is already taken") {
				res.status(400).send({
					status: "Error",
					message: "login is already taken"
				});
			} else {
				res.status(500).send({
					status: "Error",
					message: err.message
				});
			}
		}
		else res.send(data);
	});
};

exports.login = (req, res) => {
	const User = {
		Login: req.body.Login,
		Password: req.body.Password
	};

	passportUsers.login(User, (err, data) => {
		if (err) {
			if (err.kind === "Incorrect login or password") {
				res.status(400).send({
					status: "Error",
					message: "Incorrect login or password"
				});
			} else {
				res.status(500).send({
					status: "Error",
					message: err.message
				});
			}
		}
		else res.send(data);
	});
};

exports.readById = (Id) => passportUsers.readById(Id);