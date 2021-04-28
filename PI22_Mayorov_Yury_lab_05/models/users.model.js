const sql = require("../models/database.model.js");

const Users = function (user) {
	this.nickname = user.nickname;
	this.idrole = user.idrole;
};

Users.create = (newUser, result) => {
	sql.query(`INSERT INTO Users VALUES(DEFAULT, '${newUser.nickname}', '${newUser.idrole}', DEFAULT) RETURNING idrole;`, (err, res) => {
		if (err) {
			console.log("Error: ", err);
			result(err, null);
			return;
		}
		result(null, { Id: res.rows[0].idrole, ...newUser });
	});
};

Users.update = (key, user, result) => {
	sql.query(`UPDATE Users SET nickname = '${user.nickname}', idrole = '${user.idrole}' WHERE iduser = '${key}';`, (err, res) => {
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
	sql.query(`UPDATE Users SET isDeleted = true WHERE iduser = '${key}';`, (err, res) => {
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
		sql.query(`SELECT iduser, nickname, idrole FROM Users WHERE iduser = '${key}' AND isDeleted = false`, (err, res) => {
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
		sql.query(`SELECT iduser, nickname, idrole FROM Users WHERE isDeleted = false`, (err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(err, null);
				return;
			}
			result(null, { ...res.rows });
		})
	}
};

Users.readByRole = (key, result) => {
	sql.query(`SELECT iduser, nickname, idrole FROM Users WHERE idrole = '${key}' AND isDeleted = false`, (err, res) => {
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

module.exports = Users;