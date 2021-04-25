const e = require('express')
const db = require('../db')

class WriterController{
    async createWriter(req,res){
        const {name,surname,patronymic} = req.body
        const newWriter = await db.query('INSERT INTO writer(lastname,firstname,patronymic) values ($1, $2, $3) RETURNING *',[surname,name,patronymic])
        res.json(newWriter.rows[0])
    }
    async updateWriter(req,res){
        const {id,name,surname,patronymic} = req.body
        const updateWriter = await db.query('UPDATE writer SET (lastname,firstname,patronymic) = ($1,$2,$3) WHERE writerId = $4 RETURNING *',[surname,name,patronymic,id])
        res.json(updateWriter.rows[0])
    }
    async getWriter(req,res){
        const id = req.au
        const writers = await db.query('SELECT * FROM writer WHERE writerId = $1',[id])
        res.json(writers.rows[0])
    }
    async getWriters(req,res){
        const writers = await db.query('SELECT * FROM writer')
        res.json(writers.rows)
    }
    async deleteWriter(req,res){
        const id = req.params.id
        const writer = await db.query('UPDATE writer SET isDeleted = TRUE WHERE writerId = $1 RETURNING *',[id])
        res.json(writer.rows[0])
    }
}

module.exports = new WriterController()