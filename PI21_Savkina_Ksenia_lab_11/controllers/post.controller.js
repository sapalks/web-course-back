const db = require("../db")
const cache = require("../cache")

class postController {

    async createPost(req, res) {
        const {name, text} = req.body;
        const result = await db.query("INSERT INTO POST(PostId, Name, Text, CreatedAt) VALUES (nextval('post_postid_seq'), $1, $2, NOW()) RETURNING *", [name, text]);
        res.json(result.rows[0]);
        cache.clear('posts');
    }

    async getPost(req, res) {
        const id = req.params.id;
        const isCached = await cache.get(`post ${id}`)
        if (isCached) {
            return res.json(isCached)
        }
        const result = await db.query("SELECT * FROM POST WHERE IsDel = FALSE AND PostID = $1", [id]);
        res.json(result.rows[0]);
        cache.add(`post ${id}`, result.rows[0])
    }

    async getPosts(req, res) {
        const isCached = await cache.get(`posts`)
        if (isCached) {
            return res.json(isCached)
        }
        const result = await db.query("SELECT * FROM POST WHERE IsDel = FALSE");
        res.json(result.rows);
        cache.add('posts', result.rows)
    }

    async updatePost(req, res) {
        const {id, text} = req.body;
        const result = await db.query("UPDATE POST SET Text = $1 WHERE PostID = $2 AND IsDel = FALSE RETURNING *", [text, id]);
        res.json(result.rows[0]);
        cache.clear(`post ${id}`);
        cache.clear('posts');
    }

    async deletePost(req, res) {
        const id = req.params.id;
        await db.query("UPDATE POST SET IsDel = TRUE WHERE PostID = $1 RETURNING *", [id]);
        res.json("Пост с id " + id + " удален");
        cache.clear(`post ${id}`);
        cache.clear('posts');
    }

    async isUsedCache(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`В последнем get запросе использовался кеш с ключом ${key}`)
        }
        res.json("В последнем get запросе не использовался кеш")
    }
}

module.exports = new postController();