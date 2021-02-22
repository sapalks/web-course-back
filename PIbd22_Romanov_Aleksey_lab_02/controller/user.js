const db = require('../db')

class UserController {
    async createUser(req, res) {
        const { email, name, phone, nickname } = req.body
        const newCustomer = await db.query(
            'INSERT INTO customer(email, name, phone, nickname) values ($1,$2,$3,$4) Returning *', [email, name, phone, nickname]
        )
        res.json(newCustomer.rows[0])
    }

    async getUsers(req, res) {
        const id = req.query.id
        if (id) {
            const user = await db.query('SELECT * FROM customer where id = $1 and isDeleted = false', [id])
            res.json(user.rows[0])
        } else {
            const users = await db.query('SELECT * FROM customer where isDeleted = false')
            res.json(users.rows)
        }
    }

    async updateUser(req, res) {
        const { id, email, name, phone, nickname } = req.body
        const user = await db.query('UPDATE customer set email = $1, name = $2, phone = $3, nickname = $4 where id = $5 RETURNING *',
            [email, name, phone, nickname, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.query.id
        await db.query('Update customer set isDeleted = true where id = $1', [id])
        res.json(`user with id: ${id} was successfully deleted`)
    }
}

module.exports = new UserController()