const sql = require("../models/database.model.js");

const Users = function (user) {
	this.name = user.name;
	this.surname = user.surname;
	this.middlename = user.middlename;
};

Users.create = (user, result) => {
	sql.query(`INSERT INTO Users VALUES(DEFAULT, '${user.name}', '${user.surname}', '${user.middlename}', DEFAULT) RETURNING Id;`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		result(null, { Id: res.rows[0].Id, ...user });
	});
};

Users.update = (key, user, result) => {
	sql.query(`UPDATE Users SET name = '${user.name}', surname = '${user.surname}', middlename = '${user.middlename}' WHERE Id = '${key}';`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		if (res.rowCount == 0) {
			result({ kind: "Not found" }, null);
			return;
		}
		result(null, { Id: key, ...user });
	})
}

Users.delete = (key, result) => {
	sql.query(`UPDATE Users SET isDeleted = true WHERE Id = '${key}';`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		if (res.rowCount == 0) {
			result({ kind: "Not found" }, null);
			return;
		}
		result(null, 'Delete is successfully');
	})
}

Users.read = (key, result) => {
	if (key) {
		sql.query(`SELECT Id, name, surname, middlename FROM Users WHERE Id = '${key}' AND isDeleted = false`, (err, res) => {
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
		sql.query(`SELECT Id, name, surname, middlename FROM Users WHERE isDeleted = false`, (err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}
			result(null, { ...res.rows });
		})
	}
};

module.exports = Users;