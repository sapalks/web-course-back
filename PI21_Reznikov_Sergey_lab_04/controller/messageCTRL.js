const db = require('../db')
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('../config/passport')
const jwtDecode =require('jwt-decode');

class MessageController {

    async getAllMessages(req, res) {
        const result = await db.query('SELECT * FROM Message where isdeleted=false');
        res.json(result.rows);
    }

    async getMessageInThread(req, res) {
        const threadid = req.params.threadid;
        const result = await db.query("SELECT * FROM Message WHERE threadid = $1 AND isdeleted=false", [threadid]);
        res.json(result.rows);
    }

    async getMessage(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM Message WHERE MessageID = $1 AND isdeleted=false', [id]);
        res.json(result.rows[0]);
    }

    async createMessage(req, res) {
        const { text,threadid,userid } = req.body;
        const result = await db.query('INSERT INTO Message(text,threadid,userid) VALUES ($1,$2,$3) RETURNING *', [text,threadid,userid]);
        res.json(result.rows[0]); 
    }

    async updateMessage(req, res) {
        const {text,messageid} = req.body;
        const result = await db.query('UPDATE Message SET text = $1 WHERE MessageID = $2 AND isdeleted=false RETURNING *',
        [text,messageid]);
        res.json(result.rows[0]);
    }

    async deleteMessage(req, res) {
        const id = req.params.id;
        await db.query('UPDATE message SET isDeleted = TRUE WHERE MessageID=$1', [id]);
        res.json('Message with id: ' + id + ' was deleted');
    }
}

module.exports = new MessageController();