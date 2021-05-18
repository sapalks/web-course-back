const db = require('../db')
const jwt = require('jsonwebtoken')

class usersController {
    async Register(req, res) {
        const {username, password} = req.body;
        if(username == "" || password == "") {
            return res.status(400).json({ status: 'error', error: 'Invalid data' });
        }
        const currentUser = await findUser(username);
        if(currentUser.login==username) {
            return res.status(400).json({ status: 'error', error: 'User with login already exist'});
        }
        const result = await db.query('insert into users(login,password) values ($1,$2) RETURNING *', [username, password]);
        res.json(result.rows[0]);
    }

    async Login(req, res) {
        const {username, password} = req.body;
        if(username == "" || password == "") {
            return res.json({ status: 'error', error: 'Invalid data' });
        }
        const currentUser = await findUser(username);
        if(!currentUser || password !== currentUser.password) {
            return res.status(400).json({ status: 'error', error: 'User not found or Invalid password' });
        }
        //Создаём токен на 7 дней с кодовым ключём
        const token = jwt.sign({userID: currentUser.userid, username}, 'secret', { expiresIn: "7d" })
        return res.json({
            token,
            currentUser: {
                userID: currentUser.userid,
                username: username
            }
        });
    }
}

const findUser = async (username) => {
    const currentUser = await db.query('SELECT * FROM users WHERE login = $1', [username]);
    if(!currentUser.rows[0]) {
        return {};
    }
    return currentUser.rows[0];
}

module.exports = new usersController();