const Users = require('../models/users.model.js');

exports.create = (req, res) => {
	const user = new Users({
		nickname: req.body.nickname,
		idrole: req.body.idrole
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
		nickname: req.body.nickname,
		idrole: req.body.idrole
	})
	Users.update(Id, user, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `Пользователь с ID ${Id} не найден.`
				});
			} else {
				res.status(500).send({
					message: `Ошибка изменения пользователя: ID ${Id}`
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
			message: "Пустое тело запроса"
		});
	}
	else {
		Users.delete(Id, (err, data) => {
			if (err) {
				if (err.kind === "Not found") {
					res.status(404).send({
						message: `Пользователь с ID ${Id} не найден.`
					});
				} else {
					res.status(500).send({
						message: `Ошибка удаления пользователя: ID ${Id}`
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
					message: `Пользователь с ID ${Id} не найден.`
				});
			} else {
				res.status(500).send({
					message: `Ошибка считывания пользователей`
				});
			}
		}
		else res.send(data);
	});
};

exports.readByRole = (req, res) => {
	let Id = req.query.idrole
	Users.readByRole(Id, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `Не найдены пользователи с ролью: ID ${Id}.`
				});
			} else {
				res.status(500).send({
					message: `Ошибка считывания пользователей`
				});
			}
		}
		else res.send(data);
	});
};