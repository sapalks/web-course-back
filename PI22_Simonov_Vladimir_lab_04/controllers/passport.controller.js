const passport = require('../models/passport.model.js');

exports.register = (req, res) => {
	const user = {
		Login: req.body.Login,
		Password: req.body.Password
	};

	passport.register(user, (err, data) => {
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

	passport.login(User, (err, data) => {
		if (err) {
			if (err.kind === "incorrect login or password") {
				res.status(400).send({
					status: "Error",
					message: "incorrect login or password"
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

exports.readById = (Id) => passport.readById(Id);