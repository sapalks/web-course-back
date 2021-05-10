const db = require("../db")

class postController {

    async createPost(req, res) {
        const {name, text} = req.body;
        const result = await db.query("INSERT INTO POST(PostId, Name, Text, CreatedAt) VALUES (nextval('post_postid_seq'), $1, $2, NOW()) RETURNING *", [name, text]);
        res.json(result.rows[0]);
    }

    async getPost(req, res) {
        const id = req.params.id;
        const result = await db.query("SELECT * FROM POST WHERE IsDel = FALSE AND PostID = $1", [id]);
        res.json(result.rows[0]);
    }

    async getPosts(req, res) {
        const result = await db.query("SELECT * FROM POST WHERE IsDel = FALSE");
        res.json(result.rows);
    }

    async updatePost(req, res) {
        const {id, name, text} = req.body;
        const result = await db.query("UPDATE POST SET Name = $1, Text = $2 WHERE PostID = $3 RETURNING *", [name, text, id]);
        res.json(result.rows[0]);
    }

    async deletePost(req, res) {
        const id = req.params.id;
        await db.query("UPDATE POST SET IsDel = TRUE WHERE PostID = $1 RETURNING *", [id]);
        res.json("Post with Id " + id + " deleted");
    }
}

module.exports = new postController();