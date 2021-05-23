const db = require('../db')

class ProjectController {
    async createProject(req, res) {
        const { name, description, customerId, isHost } = req.body
        const newProject = await db.query(
            'INSERT INTO project(name, description) values ($1,$2) RETURNING id', [name, description]
        )
        const projectId = newProject.rows[0].id
        await db.query('INSERT INTO customer_project(customerid, projectid, ishost) values ($1,$2, $3)',
            [customerId, projectId, isHost])
        res.json(projectId)
    }

    async getProject(req, res) {
        const { id, customerId } = req.query
        if (id) {
            const project = await db.query('SELECT * FROM project where id = $1 and isDeleted = false', [id])
            res.json(project.rows[0])
            return
        }
        if (customerId) {
            const project = await db.query(
                'select * from project where id = (select projectid from customer_project where customerid = $1 and isDeleted = false)', [customerId])
            res.json(project.rows)
        } else {
            const projects = await db.query('SELECT * FROM project where isDeleted = false')
            res.json(projects.rows)
        }
    }

    async updateProject(req, res) {
        const { id, name, description } = req.body
        const project = await db.query('UPDATE project set name = $1, description = $2 where id = $3 RETURNING *',
            [name, description, id])
        res.json(project.rows[0])
    }

    async deleteProject(req, res) {
        const id = req.query.id
        await db.query('Update customer_project set isDeleted = true where projectid = $1', [id])
        await db.query('Update project set isDeleted = true where id = $1', [id])
        res.json(`project with id: ${id} was successfully deleted`)
    }
}

module.exports = new ProjectController()