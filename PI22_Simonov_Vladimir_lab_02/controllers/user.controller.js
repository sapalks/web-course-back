const Users = require('../models/users.model.js');

exports.create = (req, res) => {
	const user = new Users({
		name: req.body.name,
		surname: req.body.surname,
		middlename: req.body.middlename
	});

	Users.create(user, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message
			});
		}
		else res.send(data);
	});
};

exports.update = (req, res) => {
	let Id = req.body.Id;
	const user = new Users({
		name: req.body.name,
		surname: req.body.surname,
		middlename: req.body.middlename
	})
	Users.update(Id, user, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `User with ID ${Id} not found.`
				});
			} else {
				res.status(500).send({
					message: `Error on update user with ID ${Id}`
				});
			}
		}
		else res.send(data);
	});
};

exports.delete = (req, res) => {
	let Id = req.query.Id
	if (!Id) {
		res.status(400).send({
			message: "Empty request body"
		});
	}
	else {
		Users.delete(Id, (err, data) => {
			if (err) {
				if (err.kind === "Not found") {
					res.status(404).send({
						message: `User with ID ${Id} not found.`
					});
				} else {
					res.status(500).send({
						message: `Error on delete user with ID ${Id}`
					});
				}
			}
			else res.send(data);
		});
	}
};

exports.read = (req, res) => {
	let Id = req.query.Id
	Users.read(Id, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `User with ID ${Id} not found.`
				});
			} else {
				res.status(500).send({
					message: `Error on read users`
				});
			}
		}
		else res.send(data);
	});
};