const sql = require("../models/database.model.js");

const Roles = function (role) {
	this.namerole = role.namerole;
};
 Roles.create = (newRole, result) => {
	sql.query(`INSERT INTO Roles VALUES(DEFAULT, '${newRole.namerole}', DEFAULT) RETURNING idrole;`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		result(null, { Id: res.rows[0].idrole, ...newRole });
	});
};
 Roles.read = (key, result) => {
	if (key) {
		sql.query(`SELECT idrole, namerole FROM Roles WHERE idrole = '${key}' AND isDeleted = false`, (err, res) => {
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
		sql.query(`SELECT idrole, namerole FROM Roles WHERE isDeleted = false`, (err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}
			result(null, { ...res.rows });
		})
	}
};
 Roles.update = (key, role, result) => {
	sql.query(`UPDATE Roles SET namerole = '${role.namerole}' WHERE idrole = '${key}';`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		if (res.rowCount == 0) {
			result({ kind: "Not found" }, null);
			return;
		}
		result(null, { Id: key, ...role });
	})
}
 Roles.delete = (key, result) => {
	sql.query(`UPDATE Roles SET isDeleted = true WHERE idrole = '${key}';`, (err, res) => {
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

module.exports = Roles;