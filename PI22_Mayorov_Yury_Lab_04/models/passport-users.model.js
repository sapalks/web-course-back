const sql = require("../models/database.model.js");
const jwt = require('jsonwebtoken');
const secretkey = "nexus";
const tokenTimeLife = 7 * 24 * 60 * 60;

async function read(login) {
	let user = await sql.query(`Select * from passportusers where login='${login}'`);
	return user.rowCount > 0 ? user.rows[0] : null;
};

class PassportUsers {
	async register(newUser, result) {
		let user = await read(newUser.Login);
		if (!user) {
			sql.query(`Insert into passportusers(login, password) values ('${newUser.Login}','${newUser.Password}')`, (err, res) => {
				if (err) {
					result(err, null);
					return;
				}
				result(null, { ...newUser });
				return;
			});
		} else {
			result({ kind: "login is already taken" }, null);
		}
	}
	async login(user, result) {
		let userdb = await read(user.Login);
		if (!userdb || user.Password !== userdb.password) {
			result({ kind: "Incorrect login or password" }, null);
			return;
		}
		let payload = { Id: userdb.id, Login: userdb.login };
		let signOptions = { expiresIn: tokenTimeLife };
		let token = jwt.sign(payload, secretkey, signOptions);
		result(null, { status: "ok", token: token });
	}

	async readById(Id) {
		let user = await sql.query(`Select * from passportusers where Id=${Id}`);
		return user.rowCount > 0 ? user.rows[0] : null;
	}
}

module.exports = new PassportUsers();