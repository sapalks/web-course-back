const Cache = require('node-cache')
const TTL = 60 * 60 * 4
let lastKey

class Caching {
    constructor() {
        this.cache = new Cache({ stdTTL: TTL, checkperiod: TTL * 0.2, useClones: false });
    }

    async save(key, value) {
        lastKey = null
        this.cache.set(key, value)
    }

    async get(key) {
        const value = this.cache.get(key);
        if (value) {
            return value;
        }
    }

    async delete(keys) {
        await this.cache.del(keys)
    }

    async getLastKey() {
        return await lastKey
    }
}

module.exports = new Caching();