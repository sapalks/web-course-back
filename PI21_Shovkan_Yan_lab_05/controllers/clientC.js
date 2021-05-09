const database = require('../database.js')
const jwt = require('jsonwebtoken')

class clientC {

    async register(req, res) {
        const { clientLogin, clientPassword } = req.body;

        if ((await database.query('select * from client where clientLogin = $1', [clientLogin])).rows[0] != null) {
            return res.status(400).json({ 
                status: 'Ошибка!',
                 error: 'Такой клиент уже существует'
                });
        }

        await database.query('insert into client (clientLogin , clientPassword) values ($1, $2)', [clientLogin, clientPassword]);
        res.json({
            status: 'Ок'
        });
    }

    async login(req, res) {
        const { clientLogin, clientPassword } = req.body;
        try {
            const client = (await database.query('select * from client where clientLogin = $1', [clientLogin])).rows[0];

            if (clientPassword != client.clientpassword) {
                return res.status(400).json({
                     status: 'Ошибка!',
                      error: 'Вы ввели неверный пароль'
                    });
            }

            const token = jwt.sign({ clientID: client.clientid }, 'secret', { expiresIn: "1w" })

            res.json({
                status: 'Ок',
                token: token
            });
        }
        catch (e) {
            res.json({
                status: 'Ошибка!',
                error: 'Такого пользователя не существует'
            });
        }

    }
}

module.exports = new clientC()