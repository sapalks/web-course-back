const Cache = require('node-cache')
const timetolive = 60 * 60 * 4

class Caching {
    constructor() {
        this.cache = new Cache({ stdTTL: timetolive, checkperiod: timetolive * 0.2, useClones: false });
        this.lastKey = null
    }

    async save(key, value) {
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

    async delete(keys) {
        await this.cache.del(keys)
    }

    async getLastKey() {
        return this.lastKey
    }
}

module.exports = new Caching();