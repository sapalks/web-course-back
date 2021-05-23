const Events = require('../models/events.model.js');

exports.create = (req, res) => {
	const events = new Events({
		eventname: req.body.eventname,
		date: req.body.date,
		iduser: req.body.iduser
	});

	Events.create(events, (err, data) => {
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
	const events = new Events({
		eventname: req.body.eventname,
		date: req.body.date,
		iduser: req.body.iduser
	})
	Events.update(Id, events, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `Event with ID ${Id} not found.`
				});
			} else {
				res.status(500).send({
					message: `Error on update event with ID ${Id}`
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
		Events.delete(Id, (err, data) => {
			if (err) {
				if (err.kind === "Not found") {
					res.status(404).send({
						message: `Event with ID ${Id} not found.`
					});
				} else {
					res.status(500).send({
						message: `Error on delete event with ID ${Id}`
					});
				}
			}
			else res.send(data);
		});
	}
};

exports.read = (req, res) => {
	let Id = req.query.Id
	Events.read(Id, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `Event with ID ${Id} not found.`
				});
			} else {
				res.status(500).send({
					message: `Error on read events`
				});
			}
		}
		else res.send(data);
	});
};

exports.readByUser = (req, res) => {
	let Id = req.query.iduser
	Events.readByUser(Id, (err, data) => {
		if (err) {
			if (err.kind === "Not found") {
				res.status(404).send({
					message: `Events with the user ${Id} were not found.`
				});
			} else {
				res.status(500).send({
					message: `Error on read events`
				});
			}
		}
		else res.send(data);
	});
};