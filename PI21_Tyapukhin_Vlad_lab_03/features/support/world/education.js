const { BaseWorld } = require('./base')
const db = require ("../../../db")

class EducationWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addEducation(name) {
        this.post("/api/education", {name});
        this.#id = this.response.json.educationid;
    }

    getEducations() {
        this.get('/api/educations');
    }

    getEducation(id) {
        this.get("/api/education/" + id);
    }

    updateEducation(educationID, name) {
        this.put("/api/education", {educationID, name});
    }

    deleteEducation(id) {
        this.delete("/api/education/" + id);
    }

    async clear() {
        await db.query("DELETE FROM education");
        await db.query("ALTER SEQUENCE education_seq RESTART");
    }
}

module.exports = { EducationWorld };