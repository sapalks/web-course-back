const db = require('../db/db')

class UsersController {
    async createUser(req, res) {
        const { username, login, password, phone } = req.body
        const newUser = await db.query(
            'INSERT INTO Users(username, login, password, phone) values ($1,$2,$3,$4) Returning *', [username, login, password, phone]
        )
        res.json(newUser.rows[0])
    }

    async getUsers(req, res) {
        const id = req.query.id
        if (id) {
            const user = await db.query('SELECT * FROM Users where id = $1 and isDeleted = false', [id])
            res.json(user.rows[0])
        } else {
            const users = await db.query('SELECT * FROM Users where isDeleted = false')
            res.json(users.rows)
        }
    }

    async updateUser(req, res) {
        const { id, username, login, password, phone, isAdmin, isVerificated } = req.body
        const user = await db.query('UPDATE Users set username = $1, login = $2, password = $3, phone = $4, isAdmin = $5, isVerificated = $6 where id = $7 RETURNING *',
            [username, login, password, phone, isAdmin, isVerificated, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.query.id
        await db.query('Update Users set isDeleted = true where id = $1', [id])
        res.json(`user with id: ${id} was successfully deleted`)
    }
}

module.exports = new UsersController()