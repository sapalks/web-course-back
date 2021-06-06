const db = require('../db')

class teacherController {

    async getAllTeachers(req, res) {
        const result = await db.query('SELECT * FROM teacher WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getTeacherInSubjects(req, res) {
        const id = req.params.subjectID;
        const result = await db.query('SELECT * FROM teacher WHERE isDeleted = FALSE AND subjectID = $1', [id]);
        res.json(result.rows);
    }

    async getTeacher(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM teacher WHERE isDeleted = FALSE AND teacherID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createTeacher(req, res) {
        const { fullname, subjectID } = req.body;
        const result = await db.query('INSERT INTO teacher(fullname, subjectID) VALUES ($1, $2) RETURNING *', [fullname, subjectID]);
        res.json(result.rows[0]);  
    }

    async updateTeacher(req, res) {
        const {teacherID, fullname, subjectID} = req.body;
        const result = await db.query('UPDATE teacher SET fullname = $1, subjectID = $2 WHERE teacherID = $3 AND isDeleted = FALSE RETURNING *', [fullname, subjectID, teacherID]);
        res.json(result.rows[0]);
    }

    async deleteTeacher(req, res) {
        const id = req.params.id;
        await db.query('UPDATE teacher SET isDeleted = TRUE WHERE teacherID = $1 RETURNING *', [id]);
        res.json('teacher with id: ' + id + ' was deleted');
    }
}

module.exports = new teacherController();