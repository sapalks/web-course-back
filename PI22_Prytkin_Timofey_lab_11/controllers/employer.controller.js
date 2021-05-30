const db = require('../db')
const cache = require('../cache')

class employerController {
    async createEmployer(req, res){
        const {fullnameofemployer, employerlogin, employerpassword} = req.body
        const newEmployer = await db.query(`INSERT INTO employer (fullnameofemployer, employerlogin, employerpassword)
                                VALUES ($1, $2, $3) RETURNING *`, [fullnameofemployer, employerlogin,employerpassword])
        res.json(newEmployer.rows[0])
        cache.clear('employers');
        console.log('Создали заказчика')
    }

    async getEmployers(req, res){
        const isCached = await cache.get(`employers`)
        if (isCached) {
            return res.json(isCached)
        }
        const users = await db.query(`SELECT * FROM employer`)
        res.json(users.rows)
        cache.add('employers', users.rows)
        console.log('Получили список заказчиков')
    }

    async getOneEmployer(req, res){   
        const id = req.params.id;
        const isCached = await cache.get(`employer ${id}`)
        if (isCached) {
            return res.json(isCached)
        }     
        const users = await db.query(`SELECT * FROM employer WHERE id =$1`, [id])
        res.json(users.rows[0])
        cache.add(`employer ${id}`, users.rows[0])
        console.log('Получили заказчика')
    }

    async updateEmployer(req, res){
        const {fullnameofemployer, employerlogin, employerpassword, id} = req.body
        const newEmployer = await db.query(`UPDATE employer set fullnameofemployer = $1, employerlogin = $2, employerpassword = $3
                                WHERE id = $4 RETURNING *`, [fullnameofemployer, employerlogin,employerpassword, id])
        res.json(newEmployer.rows[0])
        cache.clear(`employer ${id}`);
        cache.clear('employers');
        console.log('Обновили Заказчика')
    }

    async deleteEmployer(req, res){
        const id = req.params.id
        const users = await db.query(`UPDATE employer SET isDeleted = true WHERE id =$1 AND isDeleted = false RETURNING *`, [id])
        res.json(users.rows[0])
        cache.clear(`employer ${id}`);
        cache.clear('employers');
        console.log('Удалили заказчика')
    }

    async isUsedCache(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`В последнем get запросе использовался кеш с ключом ${key}`)
        }
        res.json("В последнем get запросе не использовался кеш")
    }
}

module.exports = new employerController()