const db = require('../db')
const jwt = require('jsonwebtoken')
const timeExpire = 604800

class UserController{
    async register(req,res){
        const {login,password} = req.body
        const safelogin = await db.query('SELECT * FROM UserTable WHERE login = $1',[login])
        if (safelogin.rows[0] == null){
            if (password.length < 7){
                res.send({status:'error', body:'The password is too short'})
                return
            }
            const newUser = await db.query('INSERT INTO UserTable(login,password) values ($1, $2) RETURNING *',[login,password])
            res.send({status:'ok'})
        }
        else{
            res.send({status:'error', body:'This user is already registered'})
        }

    }

    async login(req,res){
        const {login,password} = req.body
        const safelogin = await db.query('SELECT * FROM userTable WHERE login = $1',[login])
        if (safelogin.rows[0] == null){
            res.send({status:'error', body:'The user with this login is not registered'})
        }
        else{
            const safepassword = await db.query('SELECT * FROM userTable WHERE password = $1',[password])
            if (safepassword.rows[0] == null){
                return res.status(400).json({ status: 'error', error: 'Invalid password' });
            }
            //const currentUser = await findUser(login);
            const token = jwt.sign({userID: safelogin.rows[0].userid, login}, 'secret', { expiresIn: "7d" })
            return res.json({
                token,
                currentUser: {
                    userID: safelogin.rows[0].userid,
                    username: login
                }
            });
        }
    }
}
module.exports = new UserController()