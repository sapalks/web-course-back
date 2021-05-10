const db = require('../connection.js')

class CustomerCardController {
    async getCustomerCards(req, res) {
        const CustomerCards = await db.query(`SELECT *
                                       FROM CustomerCard
                                       WHERE isdeleted = false`)
        res.json(CustomerCards.rows);
    }

    async getCustomerCard(req, res) {
        const id = req.params.id;
        const CustomerCard = await db.query(`SELECT *
                                      FROM CustomerCard
                                      WHERE id = $1
                                        AND isdeleted = false`, [id])
        res.json(CustomerCard.rows);
    }

    async createCustomerCard(req, res) {
        const {Name, TelNumber} = req.body
        await db.query('INSERT INTO CustomerCard(Name, TelNumber) VALUES ($1, $2)', [Name, TelNumber])
        res.json("Done")
    }

    async updateCustomerCard(req, res) {
        const {id, Name, TelNumber} = req.body
        await db.query('UPDATE CustomerCard SET (Name, TelNumber) = ($1,$2) WHERE Id = $3', [Name, TelNumber, id])
        res.json("Done")
    }

    async deleteCustomerCard(req, res) {
        const id = req.params.id
        await db.query('UPDATE CustomerCard SET isdeleted = true WHERE id=$1', [id])
        res.json("Done")
    }
}

module.exports = new CustomerCardController()