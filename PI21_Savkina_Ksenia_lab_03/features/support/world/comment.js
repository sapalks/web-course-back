const { BaseWorld } = require('./base')
const db = require("../../../db.js")

class CommentWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }
    
    #id;

    getLastId() {
        return this.#id;
    }

    addComment(content, postId) {
        this.post(`/comment`, {content, postId});
        this.#id = this.response.json.commentid;
    }

    getComment(id) {
        this.get(`/comment/${id}`);
    }

    getComments() {
        this.get(`/comments`);
    }

    updateComment(id, content) {
        this.put(`/comment`, {id, content});
    }

    deleteComment(id) {
        this.delete(`/comment/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM COMMENT");
    }
}

module.exports = {
    CommentWorld
}