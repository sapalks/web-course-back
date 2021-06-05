const db = require('../db')

class studentController {

    async getAllStudents(req, res) {
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getStudentInClass(req, res) {
        const id = req.params.classID;
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE AND classID = $1', [id]);
        res.json(result.rows);
    }

    async getStudent(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE AND studentID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createStudent(req, res) {
        const { login, mail, division, classID } = req.body;
        const result = await db.query('INSERT INTO student(login, mail, division, classID) VALUES ($1, $2, $3, $4) RETURNING *', [login, mail, division, classID]);
        res.json(result.rows[0]);  
    }

    async updateStudent(req, res) {
        const {studentID, login, mail, division, classID} = req.body;
        const result = await db.query('UPDATE student SET login = $1, mail = $2, division = $3, classID = $4 WHERE studentID = $5 AND isDeleted = FALSE RETURNING *',
        [login, mail, division, classID, studentID]);
        res.json(result.rows[0]);
    }

    async deleteStudent(req, res) {
        const id = req.params.id;
        await db.query('UPDATE student SET isDeleted = TRUE WHERE studentID = $1 RETURNING *', [id]);
        res.json('student with id: ' + id + ' was deleted');
    }
}

module.exports = new studentController();