const db = require("../db")
const cache = require("../cache")

class commentController {

    async createComment(req, res) {
        const {content, postId} = req.body;
        const result = await db.query("INSERT INTO COMMENT(CommentId, CreatedAt, Content, PostId) VALUES (nextval('comment_commentid_seq'), NOW(), $1, $2) RETURNING *", [content, postId]);
        res.json(result.rows[0]);
        cache.clear('comments');
    }

    async getComment(req, res) {
        const id = req.params.id;
        const isCached = await cache.get(`comment ${id}`)
        if (isCached) {
            return res.json(isCached)
        }
        const result = await db.query("SELECT * FROM COMMENT WHERE IsDel = FALSE AND CommentID = $1", [id]);
        res.json(result.rows[0]);
        cache.add(`comment ${id}`, result.rows[0])
    }

    async getComments(req, res) {
        const isCached = await cache.get(`comments`)
        if (isCached) {
            return res.json(isCached)
        }
        const result = await db.query("SELECT * FROM COMMENT WHERE IsDel = FALSE");
        res.json(result.rows);
        cache.add('comments', result.rows)
    }

    async updateComment(req, res) {
        const {id, content} = req.body;
        const result = await db.query("UPDATE COMMENT SET Content = $1 WHERE CommentID = $2 AND IsDel = FALSE RETURNING *", [content, id]);
        res.json(result.rows[0]);
        cache.clear(`comment ${id}`);
        cache.clear('comments');
    }

    async deleteComment(req, res) {
        const id = req.params.id;
        await db.query("UPDATE COMMENT SET IsDel = TRUE WHERE CommentID = $1 RETURNING *", [id]);
        res.json("Комментарий с id "  + id + " удален");
        cache.clear(`comment ${id}`);
        cache.clear('comments');
    }

    async isUsedCache(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`В последнем get запросе использовался кеш с ключом ${key}`)
        }
        res.json("В последнем get запросе не использовался кеш")
    }
}

module.exports = new commentController();