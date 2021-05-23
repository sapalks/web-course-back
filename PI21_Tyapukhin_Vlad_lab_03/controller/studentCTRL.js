const db = require('../db')

class studentController {

    async getAllStudents(req, res) {
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getStudentInEducations(req, res) {
        const id = req.params.educationID;
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE AND educationID = $1', [id]);
        res.json(result.rows);
    }

    async getStudent(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM student WHERE isDeleted = FALSE AND studentID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createStudent(req, res) {
        const { firstname, lastname, currentGroup, educationID } = req.body;
        const result = await db.query('INSERT INTO student(firstname, lastname, currentGroup, educationID) VALUES ($1, $2, $3, $4) RETURNING *', [firstname, lastname, currentGroup, educationID]);
        res.json(result.rows[0]);  
    }

    async updateStudent(req, res) {
        const {studentID, firstname, lastname, currentGroup, educationID} = req.body;
        const result = await db.query('UPDATE student SET firstname = $1, lastname = $2, currentGroup = $3, educationID = $4 WHERE studentID = $5 AND isDeleted = FALSE RETURNING *',
        [firstname, lastname, currentGroup, educationID, studentID]);
        res.json(result.rows[0]);
    }

    async deleteStudent(req, res) {
        const id = req.params.id;
        await db.query('UPDATE student SET isDeleted = TRUE WHERE studentID = $1 RETURNING *', [id]);
        res.json('student with id: ' + id + ' was deleted');
    }
}

module.exports = new studentController();

/*
"studentID": 1,
"firstname": "Vlad",
"lastname": "T",
"currentGroup": "PI21",
"educationID": 1
*/