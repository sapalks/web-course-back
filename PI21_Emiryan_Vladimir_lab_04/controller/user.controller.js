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
        if(!currentUser || currentUser.rowCount == 0) {
            return res.status(400).json({ status: 'error', error: 'User not found or Invalid password' });
        }
        
        const token = jwt.sign({userId: currentUser.rows[0].id, login}, 'secret', { expiresIn: "7d" })
        return res.json({
            token,
            currentUser: {
                userId: currentUser.rows[0].id,
                login: login
            }
        });
    }
}

module.exports = new userController();
