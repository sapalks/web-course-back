const Roles = require('../models/roles.model.js');

exports.create = (req, res) => {
	const role = new Roles({
		namerole: req.body.namerole,
	});

	Roles.create(role, (err, data) => {
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
	const role = new Roles({
		namerole: req.body.namerole,
	})
	Roles.update(Id, role, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `Роль с ID ${Id} не найдена.`
				});
			} else {
				res.status(500).send({
					message: `Ошибка изменения роли: ID ${Id}`
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
		Roles.delete(Id, (err, data) => {
			if (err) {
				if (err.kind === "Not found") {
					res.status(404).send({
						message: `Роль с ID ${Id} не найдена.`
					});
				} else {
					res.status(500).send({
						message: `Ошибка удаления роли: ID ${Id}`
					});
				}
			}
			else res.send(data);
		});
	}
};

exports.read = (req, res) => {
	let Id = req.query.Id
	Roles.read(Id, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `Роль с ID ${Id} не найдена.`
				});
			} else {
				res.status(500).send({
					message: `Ошибка считывания ролей`
				});
			}
		}
		else res.send(data);
	});
};