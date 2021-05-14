const db = require('../db/db')

class UsersController {
    async createUser(req, res) {
        const { Username, Login, Password, Phone } = req.body
        const newUser = await db.query(
            'INSERT INTO Users(Username, Login, Password, Phone) values ($1,$2,$3,$4) Returning *', [Username, Login, Password, Phone]
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
        const { id, Username, Login, Password, Phone, isAdmin, isVerificated } = req.body
        const user = await db.query('UPDATE Users set Username = $1, Login = $2, Password = $3, Phone = $4, isAdmin = $5, isVerificated = $6 where id = $7 RETURNING *',
            [Username, Login, Password, Phone, isAdmin, isVerificated, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.query.id
        await db.query('Update Users set isDeleted = true where id = $1', [id])
        res.json(`user with id: ${id} was successfully deleted`)
    }
}

module.exports = new UsersController()