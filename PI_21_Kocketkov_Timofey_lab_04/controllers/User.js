const db = require("../db")
const jwt = require("jsonwebtoken")

class userController {

    async registerUser(req, res) {
        const {login, password} = req.body;
        //console.log(login); 
        const user = await db.query("SELECT * FROM USERS WHERE login = $1", [login]);
        console.log(user.rows);
        if (user.rows.length != 0) {
            res.status(400).json({ status: 'error', message: 'Данный логин уже существует' })
            return
        }
        await db.query("INSERT INTO USERS (Login, Password) VALUES ($1, $2) RETURNING *", [login, password]);
        res.json({
            status: 'ok'
        });
    }

    async loginUser(req, res) {
        const {login, password} = req.body;
        const user = await db.query("SELECT * FROM USERS WHERE Login = $1 AND password = $2", [login, password]);
        //console.log(user.rows.length)
        if (user.rows.length == 0) {
            res.status(401).json({ status: 'error', message: 'Неверный логин или пароль' })
            return
        }
        //console.log(user.rows[0].id)
        const token = jwt.sign({id: user.rows[0].id}, 'secret', { expiresIn: "7d" })
        res.json({
            status: 'ok',
            body: `${token}`
        });
    }
}

module.exports = new userController();