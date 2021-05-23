const sql = require("./db.model.js");
const jwt = require('jsonwebtoken');

const secretkey = "Filippov";
const tokenTimeLife = 60 * 60 * 24 * 7;

async function read(login) {
    let user = await sql.query(`Select * from users where login='${login}'`);
    return user.rowCount > 0 ? user.rows[0] : null;
};

class Users {
    async register(newUser, result) {
        let user = await read(newUser.Login);
        if (!user) {
            sql.query(`Insert into users(login, password) values ('${newUser.Login}','${newUser.Password}')`, (err, res) => {
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
        let user = await sql.query(`Select * from users where Id=${Id}`);
        return user.rowCount > 0 ? user.rows[0] : null;
    }
}

module.exports = new Users();