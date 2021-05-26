const db = require('../db')
const jwt = require('jsonwebtoken')

class userController {

    async login(req, res) {
        const {username, password} = req.body;
        if(username == "" || password == "") {
            return res.json({ status: 'error', error: 'Неверные данные' });
        }
        const currentUser = await findUser(username);
        if(!currentUser || password != currentUser.password) {
            return res.status(400).json({ status: 'error', error: 'Пользователь не найден или неверный пароль' });
        }
        const token = jwt.sign({userID: currentUser.id, username}, 'secret', { expiresIn: "7d" })
        return res.json({
            token,
            currentUser: {
                userID: currentUser.id,
                username: username
            }
        });
    }

    async register(req, res) {
        const {username, password} = req.body;
        if(username == "" || password == "") {
            return res.status(400).json({ status: 'error', error: 'Неверные данные' });
        }
        const currentUser = await findUser(username);
        if(username == currentUser.username) {
            return res.status(400).json({ status: 'error', error: 'Такой пользователь уже существует'});
        }
        const result = await db.query('INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.json(result.rows[0]);
    }
}

async function findUser(username) {
    const currentUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (currentUser.rows[0]) return currentUser.rows[0];
    return {};
}

module.exports = new userController();