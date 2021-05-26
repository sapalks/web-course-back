const database = require('../ConnectToBd.js')
const jwt = require('jsonwebtoken')

class userController {

    async register(req, res) {
        const { userLogin, userPassword } = req.body;

        if ((await database.query('select * from user_ where userLogin = $1', [userLogin])).rows[0] != null) {
            return res.status(400).json({ 
                status: 'Ошибка!',
                 error: 'Такой клиент уже существует'
                });
        }

        await database.query('insert into user_ (userLogin , userPassword) values ($1, $2)', [userLogin, userPassword]);
        res.json({
            status: 'Ок'
        });
    }

    async login(req, res) {
        const { userLogin, userPassword } = req.body;
        try {
            const user_ = (await database.query('select * from user_ where userLogin = $1', [userLogin])).rows[0];

            if (userPassword != user_.userpassword) {
                return res.status(400).json({
                     status: 'Ошибка!',
                      error: 'Вы ввели неверный пароль'
                    });
            }

            const token = jwt.sign({ userID: user_.userid }, 'secret', { expiresIn: "1w" })

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

module.exports = new userController()