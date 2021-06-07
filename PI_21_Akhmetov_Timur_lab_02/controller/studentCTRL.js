const db = require('../db')

class studentController {

    async geAllStudents(req, res) {
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getStudentInSpecialities(req, res) {
        const id = req.params.specialityID;
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE AND specialityID = $1', [id]);
        res.json(result.rows);
    }

    async getStudent(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE AND studentID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createStudent(req, res) {
        const { firstname, lastname, specialityID } = req.body;
        const result = await db.query('INSERT INTO student(firstname, lastname, specialityID) VALUES ($1, $2, $3, $4) RETURNING *', [firstname, lastname, specialityID]);
        res.json(result.rows[0]);  
    }

    async updateStudent(req, res) {
        const {studentID, firstname, lastname, specialityID} = req.body;
        const result = await db.query('UPDATE student SET firstname = $1, lastname = $2, specialityID = $4 WHERE studentID = $5 AND isDeleted = FALSE RETURNING *',
        [firstname, lastname, specialityID, studentID]);
        res.json(result.rows[0]);
    }

    async deleteStudent(req, res) {
        const id = req.params.id;
        await db.query('UPDATE student SET isDeleted = TRUE WHERE studentID = $1 RETURNING *', [id]);
        res.json('student with id: ' + id + ' was deleted');
    }
}

module.exports = new studentController();