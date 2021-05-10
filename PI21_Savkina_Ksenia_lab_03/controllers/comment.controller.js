const db = require("../db")

class commentController {

    async createComment(req, res) {
        const {content, postId} = req.body;
        const result = await db.query("INSERT INTO COMMENT(CommentId, CreatedAt, Content, PostId) VALUES (nextval('comment_commentid_seq'), NOW(), $1, $2) RETURNING *", [content, postId]);
        res.json(result.rows[0]);
    }

    async getComment(req, res) {
        const id = req.params.id;
        const result = await db.query("SELECT * FROM COMMENT WHERE IsDel = FALSE AND CommentID = $1", [id]);
        res.json(result.rows[0]);
    }

    async getComments(req, res) {
        const result = await db.query("SELECT * FROM COMMENT WHERE IsDel = FALSE");
        res.json(result.rows);
    }

    async updateComment(req, res) {
        const {id, content} = req.body;
        const result = await db.query("UPDATE COMMENT SET Content = $1 WHERE CommentID = $2 AND IsDel = FALSE RETURNING *", [content, id]);
        res.json(result.rows[0]);
    }

    async deleteComment(req, res) {
        const id = req.params.id;
        await db.query("UPDATE COMMENT SET IsDel = TRUE WHERE CommentID = $1 RETURNING *", [id]);
        res.json("Comment with Id "  + id + " deleted");
    }
}

module.exports = new commentController();