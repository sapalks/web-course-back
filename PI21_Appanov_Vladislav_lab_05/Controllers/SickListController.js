const db = require('../connection.js')

class SickListController {
    async getSickLists(req, res) {
        const SickLists = await db.query(`SELECT *
                                       FROM SickList
                                       WHERE isdeleted = false`)
        res.json(SickLists.rows);
    }

    async getSickList(req, res) {
        const id = req.params.id;
        const SickList = await db.query(`SELECT *
                                      FROM SickList
                                      WHERE id = $1
                                        AND isdeleted = false`, [id])
        res.json(SickList.rows);
    }

    async getSickListsByCustomerCard(req, res) {
        const CustomerCardId = req.params.id;
        const SickList = await db.query(`SELECT *
                                    FROM SickList
                                    WHERE CustomerCardid = $1
                                      AND isdeleted = false`, [CustomerCardId])
        res.json(SickList.rows);
    }


    async createSickList(req, res) {
        const {StartDate, EndDate, CustomerCardId} = req.body
        await db.query('INSERT INTO SickList(StartDate, EndDate, CustomerCardId) VALUES ($1, $2, $3)', [StartDate, EndDate, CustomerCardId])
        res.json("Done")
    }

    async updateSickList(req, res) {
        const {StartDate, EndDate, CustomerCardId, id} = req.body
        await db.query('UPDATE brand SET (StartDate, EndDate, CustomerCardId) = ($1,$2,$3) WHERE Id = $4', [StartDate, EndDate, CustomerCardId, id])
        res.json("Done")
    }

    async deleteSickList(req, res) {
        const id = req.params.id
        await db.query('UPDATE SickList SET isdeleted = true WHERE id=$1', [id])
        res.json("Done")
    }
}

module.exports = new SickListController()