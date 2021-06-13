const db = require('../db')
const jwt = require('jsonwebtoken')

class userController {

    async register(req, res) {
        const {login, password} = req.body;
        if(login == "" || password == "") {
            return res.status(400).json({ status: 'error', error: 'Invalid data' });
        }
        const currentUser = await db.query('SELECT * FROM app_user WHERE login = $1', [login]);
        if(login === currentUser.login) {
            return res.status(400).json({ status: 'error', error: 'User with login already exist'});
        }
        const result = await db.query('INSERT INTO app_user(login, password) VALUES ($1, $2) RETURNING *', [login, password]);
        res.json(result.rows[0]);
    }

    async login(req, res) {
        const {login, password} = req.body;
        if(login == "" || password == "") {
            return res.json({ status: 'error', error: 'Invalid data' });
        }
        const currentUser = await db.query('SELECT * FROM app_user WHERE login = $1', [login]);
        if(!currentUser || password !== currentUser.password) {
            return res.status(400).json({ status: 'error', error: 'User not found or Invalid password' });
        }
        // функция sing принимает 3 параметра: объект с данными, помещаемый в токен,
        // секретный ключ и время существования токена
        const token = jwt.sign({userId: currentUser.id, login}, 'secret', { expiresIn: "7d" })
        return res.json({
            token,
            currentUser: {
                userId: currentUser.id,
                login: login
            }
        });
    }
}

module.exports = new userController();