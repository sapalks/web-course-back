const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const config = require('../passportconfig')

class AuthorizationController {

    //Залогиниться (ну хотя бы попытаться)
    async login(req, res) {

        const {customeremail, customerpassword} = req.body
        const customer = await db.query('SELECT * FROM customer WHERE customeremail = $1', [customeremail])

        if (customer.rowCount > 0) {
            const isMatch = bcrypt.compareSync(customerpassword, customer.rows[0].customerpassword)
            if (isMatch) {
                const token = jwt.sign({
                    customeremail: customer.rows[0].customeremail,
                    id: customer.rows[0].id
                }, config.jwtKey, {expiresIn: config.ttl})

                

                res.status(200).json({
                    status: "Вы успешно авторизовались",
                    body: token
                })
            } else {
                res.status(401).json({
                    status: "Пароли не совпадают."
                })
            }
        } else {
            res.status(404).json({
                status: "Не существует пользователя с таким customeremail"
            })
        }
    }

    //Зарегистрировать (ну хотя бы попытаться)
    async register(req, res) {

        const {customeremail, customerpassword} = req.body

        const regexpmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

        if(regexpmail.test(customeremail)){
            const customer = await db.query('SELECT * FROM customer WHERE customeremail = $1', [customeremail])
            console.log()
            if (customer.rowCount > 0) {
                res.status(409).json({
                    status: 'Пользователь с таким customeremail уже зарегистрирован'
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const customerpasswordhash = bcrypt.hashSync(customerpassword, salt)
                const newCustomer = await db.query(`INSERT INTO customer (customeremail, customerpassword) values ($1, $2) RETURNING * `, [customeremail, customerpasswordhash])
                newCustomer.rows.length > 0 ? res.status(201).json({status: "Вы успешно зарегестрировались"}) : res.status(400).json("Не удалось добавить вас в базу данных");
            }
        } else {
            res.status(409).json({
                status: 'Такой почты не может существовать'
            })
        }
    }
}

module.exports = new AuthorizationController()