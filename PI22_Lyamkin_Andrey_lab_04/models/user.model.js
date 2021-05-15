const pg = require("./db.connect.js")
const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')
const {secret} = require('../configs/config')   

async function register(registerData, callback) {
     
    const user = await getUserByLogin(registerData.login, callback)
    if (!user) {
        hashPass = bcryptjs.hashSync(registerData.pass, 5)

        pg.query(`INSERT INTO "user" (login, pass) VALUES ('${registerData.login}','${hashPass}')`, (err, res) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, {status: "Регистрация прошла успешно"})
            return
        })
    } else {
        callback({ status: "exist" }, null)
    }
}

async function login(loginData, callback) {
    const user = await getUserByLogin(loginData.login, callback)

    if (user){
        validPass = bcryptjs.compareSync(loginData.pass, user.pass)
        if(!validPass){
            callback({status: "error"}, null)
            return
        }
    } else{
        callback({status: "error"}, null)
        return
    }
    const token = generateAccessToken(user.user_id, user.login)
    callback(null, { status: "ok", token: token })
}

async function getUserByLogin(login, callback) {
    try{
        const user = await pg.query(`SELECT * FROM "user" WHERE login = '${login}'`)

        if(user.rowCount > 0){
            return user.rows[0]
        } else{
            return null 
        }        
    } catch (err){
        callback(err, null)
    }
}

function generateAccessToken(id, login){
    const payload = {
        id,
        login
    }
    return jwt.sign(payload, secret, {expiresIn: "168h"})
}

module.exports = {
    login: login,
    register: register,
}
