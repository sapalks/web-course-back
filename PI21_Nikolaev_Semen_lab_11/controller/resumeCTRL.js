const database = require('../databaseconnect')
const cache = require('../cache.js')
class resumeController {
    async createresume(req, res) {
        const {resumeid,firstname, lastname, vacancyid} = req.body
        const newresume = await database.query(`INSERT INTO resume (resumeid, firstname, lastname, vacancyid) values ($1, $2, $3, $4) RETURNING * `, [resumeid, firstname, lastname, vacancyid])
        cache.delete(`resumes`)
        newresume.rows.length > 0 ? res.json(newresume.rows[0]) : res.status(400).json("Error");

    }
    async getresume(req, res) {
        const resumeid = req.params.id;
        const cached = await cache.get(`resume ${resumeid}`)
        if (cached) {
            return res.json(cached)
        }
        const resume = await database.query(`SELECT * FROM resume where resumeid = $1 AND delete = false`, [resumeid])
        resume.rows.length > 0 ? res.json(resume.rows[0]) : res.status(400).json("resume doesn't exist");
        cache.save(`resume ${resumeid}`, resume.rows[0])
    }

    async getresumes(req, res) {
        const cached = await cache.get(`resumes`)
        if (cached) {
            return res.json(cached)
        }
        const resumes = await database.query(`SELECT * FROM resume where delete = false`)
        cache.save('resumes', resumes.rows)
        resumes.rows.length > 0 ? res.json(resumes.rows) : res.status(400).json("resumes doesn't exist");
    }

    async updateresume(req, res) {
        const {resumeid, firstname, lastname, vacancyid} = req.body;
        const resume = await database.query(`UPDATE resume set firstname = $2, lastname = $3, vacancyid = $4 
        where resumeid = $1 AND delete = false RETURNING *`, [resumeid, firstname, lastname, vacancyid])
        cache.delete(`resume ${id}`)
        cache.delete(`resumes`)
        resume.rows.length > 0 ? res.json(resume.rows[0]) : res.status(400).json("resume doesn't exist");
    }

    async deleteresume(req, res) {
        const resumeid = req.params.id;
        const resume = await database.query(`UPDATE resume set delete = true where resumeid = $1 AND delete = false RETURNING *`, [resumeid])
        cache.delete(`resume ${resumeid}`)
        cache.delete(`resumes`)
        resume.rows.length > 0 ? res.json(resume.rows[0]) : res.status(400).json("resume doesn't exist or already deleted");
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`cache key saved ${key}`)
        }
        res.json(`No cache`)
    }
}

module.exports = new resumeController()