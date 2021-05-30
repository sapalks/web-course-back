const node_cache = require('node-cache')

class Cache {
    cache
    Caching
    constructor() {
        this.cache = new node_cache({ useClones: false });
        this.Caching = false;
    }

    save(key, value) {
        this.cache.set(key, value)
    }

    async read(key) {
        const value = await this.cache.get(key);
        if (value) {
            this.Caching = true
            return value
        }
        this.Caching = false
    }

    delete(key) {
        this.cache.del(key);
    }

    isCaching() {
        return this.Caching
    }
}

module.exports = new Cache();