const users = require('../models/users.model.js');

exports.register = (req, res) => {
    const newUser = {
        Login: req.body.Login,
        Password: req.body.Password
    };

    users.register(newUser, (err, data) => {
        if (err) {
            if (err.kind === "login is already taken") {
                res.status(400).send({
                    status: "Error",
                    message: "Логин уже занят"
                });
            } else {
                res.status(500).send({
                    status: "Error",
                    message: err.message
                });
            }
        }
        else res.send(data);
    });
};

exports.login = (req, res) => {
    const User = {
        Login: req.body.Login,
        Password: req.body.Password
    };

    users.login(User, (err, data) => {
        if (err) {
            if (err.kind === "Incorrect login or password") {
                res.status(400).send({
                    status: "Error",
                    message: "Неправильный логин или пароль"
                });
            } else {
                res.status(500).send({
                    status: "Error",
                    message: err.message
                });
            }
        }
        else res.send(data);
    });
};

exports.readById = (Id) => users.readById(Id);