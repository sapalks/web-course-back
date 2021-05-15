const users = require('../models/user.model.js')

function register(req, res) {
    const {login, pass} = req.body

    users.register({login: login, pass: pass}, (err, res2) => {
        if (err) {
            if (err.status === "exist") {
                console.log(err.message)
                res.status(400).send({
                    status: "Error",
                    message: "Пользователь с таким логином уже существует"
                })
            } else {
                console.log(err.message)
                res.status(500).send({
                    status: "Error",
                    message: err.message
                })
            }
        }
        else res.send(res2)
    })
}

function login(req, res) {
    const {login, pass} = req.body

    users.login({login: login, pass: pass}, (err, data) => {
        if (err) {
            if (err.status === "error") {
                console.log(err.message)
                res.status(400).send({
                    status: "Error",
                    message: "Неверный логин или пароль"
                })
            } else {
                console.log(err.message)
                res.status(500).send({
                    status: "Error",
                    message: err.message
                })
            }
        }
        else res.send(data)
    })
}

module.exports = {
    login: login,
    register: register,
}
