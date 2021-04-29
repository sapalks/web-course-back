const { BaseWorld } = require('./base')
const db = require ("../../../db")

class StudentWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addStudent(firstname, lastname, currentGroup, educationID) {
        this.post("/api/student", {firstname, lastname, currentGroup, educationID});
        this.#id = this.response.json.studentid;
    }

    getStudents() {
        this.get("/api/students");
    }

    getStudentInEducations(educationID) {
        this.get("/api/students/" + educationID);
    }

    getStudent(id) {
        this.get("/api/student/" + id);
    }

    updateStudent(studentID, firstname, lastname, currentGroup, educationID) {
        this.put("/api/student", {studentID, firstname, lastname, currentGroup, educationID});
    }

    deleteStudent(id) {
        this.delete("/api/student/" + id);
    }

    async clear() {
        await db.query("DELETE FROM student");
    }
}

module.exports = { StudentWorld };