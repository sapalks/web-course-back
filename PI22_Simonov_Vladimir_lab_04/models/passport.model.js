const sql = require("../models/database.model.js");
const jwt = require('jsonwebtoken');
const lifeToken= 7 * 24 * 60 * 60;
const key = "vova";

async function read(login) {
	let user = await sql.query(`Select * from passport where login='${login}'`);
	return user.rowCount > 0 ? user.rows[0] : null;
};

class Passport {
	async register(newUser, result) {
		let user = await read(newUser.Login);
		if (!user) {
			sql.query(`Insert into passport(login, password) values ('${newUser.Login}','${newUser.Password}')`, (err, res) => {
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
			result({ kind: "incorrect login or password" }, null);
			return;
		}
		let payload = { Id: userdb.id, Login: userdb.login };
		let signOptions = { expiresIn: lifeToken};
		let token = jwt.sign(payload, key, signOptions);
		result(null, { status: "ok", token: token });
	}

	async readById(Id) {
		let user = await sql.query(`Select * from passport where Id=${Id}`);
		return user.rowCount > 0 ? user.rows[0] : null;
	}
}

module.exports = new Passport();