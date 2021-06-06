const database = require('../databaseconnect')
class resumeController {
    async createresume(req, res) {
        const {resumeid,firstname, lastname, vacancyid} = req.body
        const newresume = await database.query(`INSERT INTO resume (resumeid, firstname, lastname, vacancyid) values ($1, $2, $3, $4) RETURNING * `, [resumeid, firstname, lastname, vacancyid])
        newresume.rows.length > 0 ? res.json(newresume.rows[0]) : res.status(400).json("Error");

    }
    async getresume(req, res) {
        const resumeid = req.params.id;
        const resume = await database.query(`SELECT * FROM resume where resumeid = $1 AND delete = false`, [resumeid])
        resume.rows.length > 0 ? res.json(resume.rows[0]) : res.status(400).json("resume doesn't exist");
    }

    async getresumes(req, res) {
        const resumes = await database.query(`SELECT * FROM resume where delete = false`)
        resumes.rows.length > 0 ? res.json(resumes.rows) : res.status(400).json("resumes doesn't exist");
    }

    async updateresume(req, res) {
        const {resumeid, firstname, lastname, vacancyid} = req.body;
        const resume = await database.query(`UPDATE resume set firstname = $2, lastname = $3, vacancyid = $4 
        where resumeid = $1 AND delete = false RETURNING *`, [resumeid, firstname, lastname, vacancyid])
        resume.rows.length > 0 ? res.json(resume.rows[0]) : res.status(400).json("resume doesn't exist");
    }

    async deleteresume(req, res) {
        const resumeid = req.params.id;
        const resume = await database.query(`UPDATE resume set delete = true where resumeid = $1 AND delete = false RETURNING *`, [resumeid])
        resume.rows.length > 0 ? res.json(resume.rows[0]) : res.status(400).json("resume doesn't exist or already deleted");
    }
}

module.exports = new resumeController()