const node_cache = require('node-cache')

class cache {
    constructor() {
        this.cache = new node_cache({ stdTTL: 100, checkperiod: 120 });
        this.lastKey = null
    }

    async add(key, value) {
        this.lastKey = null
        this.cache.set(key, value)
    }

    async get(key) {
        const value = this.cache.get(key);
        if (value) {
            this.lastKey = key
            return value
        }
    }

    async clear(key) {
        await this.cache.del(key)
    }

    async getLastKey() {
        return this.lastKey
    }
}

module.exports = new cache();