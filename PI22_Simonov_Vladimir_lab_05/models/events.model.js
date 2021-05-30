const sql = require("./database.model.js");

const Events = function (event) {
	this.eventname = event.eventname;
	this.date = event.date;
	this.iduser = event.iduser;
};
Events.create = (newEvent, result) => {
	sql.query(`INSERT INTO Events VALUES(DEFAULT, '${newEvent.eventname}', '${newEvent.date}', '${newEvent.iduser}', DEFAULT) RETURNING iduser;`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		result(null, { Id: res.rows[0].iduser, ...newEvent });
	});
};
Events.read = (key, result) => {
	if (key) {
		sql.query(`SELECT Id, eventname, date, iduser FROM Events WHERE Id = '${key}' AND isDeleted = false`, (err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}
			if (res.rowCount == 0) {
				result({ kind: "Not found" }, null);
				return;
			}
			result(null, { ...res.rows[0] });
		})
	}
	else {
		sql.query(`SELECT Id, eventname, date, iduser FROM Events WHERE isDeleted = false`, (err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}
			result(null, { ...res.rows });
		})
	}
};
Events.update = (key, event, result) => {
	sql.query(`UPDATE Events SET eventname = '${event.eventname}', date = '${event.date}', iduser = '${event.iduser}' WHERE Id = '${key}';`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		if (res.rowCount == 0) {
			result({ kind: "Not found" }, null);
			return;
		}
		result(null, { Id: key, ...event });
	})
}
Events.delete = (key, result) => {
	sql.query(`UPDATE Events SET isDeleted = true WHERE Id = '${key}';`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		if (res.rowCount == 0) {
			result({ kind: "Not found" }, null);
			return;
		}
		result(null, 'Deleted is successfully');
	})
}

Events.readByUser = (key, result) => {
	sql.query(`SELECT Id, eventname, date, iduser FROM Events WHERE iduser = '${key}' AND isDeleted = false`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		if (res.rowCount == 0) {
			result({ kind: "Not found" }, null);
			return;
		}
		result(null, { ...res.rows });
	})
}

module.exports = Events;