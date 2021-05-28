const db = require('../db')

class employerController {
    async createEmployer(req, res){
        const {fullnameofemployer, employerlogin, employerpassword} = req.body
        const newEmployer = await db.query(`INSERT INTO employer (fullnameofemployer, employerlogin, employerpassword)
                                VALUES ($1, $2, $3) RETURNING *`, [fullnameofemployer, employerlogin,employerpassword])
        res.json(newEmployer.rows[0])
        console.log('Создали заказчика')
    }

    async getEmployers(req, res){
        const users = await db.query(`SELECT * FROM employer`)
        res.json(users.rows)
        console.log('Получили список заказчиков')
    }

    async getOneEmployer(req, res){        
        const id = req.params.id
        const users = await db.query(`SELECT * FROM employer WHERE id =$1`, [id])
        res.json(users.rows[0])
        console.log('Получили заказчика')
    }

    async updateEmployer(req, res){
        const {fullnameofemployer, employerlogin, employerpassword, id} = req.body
        const newEmployer = await db.query(`UPDATE employer set fullnameofemployer = $1, employerlogin = $2, employerpassword = $3
                                WHERE id = $4 RETURNING *`, [fullnameofemployer, employerlogin,employerpassword, id])
        res.json(newEmployer.rows[0])
        console.log('Обновили Заказчика')
    }

    async deleteEmployer(req, res){
        const id = req.params.id
        const users = await db.query(`UPDATE employer SET isDeleted = true WHERE id =$1 AND isDeleted = false RETURNING *`, [id])
        res.json(users.rows[0])
        console.log('Удалили заказчика')
    }
}

module.exports = new employerController()