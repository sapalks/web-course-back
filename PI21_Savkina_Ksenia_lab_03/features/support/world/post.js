const { BaseWorld } = require('./base')
const db = require("../../../db.js")

class PostWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }
    
    #id;

    getLastId() {
        return this.#id;
    }

    addPost(name, text) {
        this.post(`/post`, {name, text});
        this.#id = this.response.json.postid;
    }

    getPost(id) {
        this.get(`/post/${id}`);
    }

    getPosts() {
        this.get(`/posts`);
    }

    updatePost(id, name, text) {
        this.put(`/post`, {id, name, text});
    }

    deletePost(id) {
        this.delete(`/post/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM POST");
    }
}

module.exports = {
    PostWorld
}