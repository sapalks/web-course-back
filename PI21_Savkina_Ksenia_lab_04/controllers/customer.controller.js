const db = require("../db")
const jwt = require("jsonwebtoken")

class customerController {

    async registerCustomer(req, res) {
        const {nickname, password} = req.body;
        const customer = await db.query("SELECT * FROM CUSTOMER WHERE IsDel = FALSE AND nickname = $1", [nickname]);
        if (customer.rows[0]) {
            res.status(400).json({ status: 'error', message: 'Данный никнейм уже используется' })
            return
        }
        await db.query("INSERT INTO CUSTOMER(CustomerId, Nickname, Password, CreatedAt) VALUES (nextval('customer_customerid_seq'), $1, $2, NOW()) RETURNING *", [nickname, password]);
        res.json({
            status: 'ok'
        });
    }

    async loginCustomer(req, res) {
        const {nickname, password} = req.body;
        const customer = await db.query("SELECT * FROM CUSTOMER WHERE IsDel = FALSE AND nickname = $1 AND password = $2", [nickname, password]);
        if (!customer.rows[0]) {
            res.status(401).json({ status: 'error', message: 'Неверный никнэйм/пароль' })
            return
        }
        const token = jwt.sign({id: customer.rows[0].customerid}, 'secret', { expiresIn: "7d" })
        res.json({
            status: 'ok',
            body: `${token}`
        });
    }
}

module.exports = new customerController();