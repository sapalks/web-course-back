const db = require('../db')

class threadController {

    async getAllThreads(req, res) {
        const result = await db.query('SELECT * FROM thread WHERE isdeleted=false');
        res.json(result.rows);
    }

    async getThreadInDescription(req, res) {
        const desc = req.params.description;
        const result = await db.query("SELECT * FROM thread WHERE description SIMILAR TO ($1) AND isdeleted=false", ["%" + desc + "%"]);
        res.json(result.rows);
    }

    async getThread(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM thread WHERE threadID = $1 AND isdeleted=false', [id]);
        res.json(result.rows[0]);
    }

    async createThread(req, res) {
        const { threadname,description } = req.body;
        const result = await db.query('INSERT INTO thread(threadname,description) VALUES ($1, $2) RETURNING *', [threadname,description]);
        res.json(result.rows[0]);  
    }

    async updateThread(req, res) {
        const {threadname,description,threadid} = req.body;
        const result = await db.query('UPDATE thread SET threadname = $1, description = $2 WHERE threadid = $3 AND isdeleted=false RETURNING *',
        [threadname,description,threadid]);
        res.json(result.rows[0]);
    }

    async deleteThread(req, res) {
        const id = req.params.id;
        await db.query('UPDATE thread SET isdeleted=true WHERE threadID=$1', [id]);
        res.json('thread with id: ' + id + ' was deleted');
    }
}

module.exports = new threadController();