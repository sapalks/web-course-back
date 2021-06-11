const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 100 });
let lastKey = null;

class Cache {
    async add(key, value) {
        myCache.set(key, value)
        lastKey = null
    }

    async get(key) {
        const curKey = myCache.get(key);
        if (curKey) {
            lastKey = key
            return curKey
        }
    }

    async clear(key) {
        await myCache.del(key)
    }

    async getLastKey() {
        return lastKey
    }

}
module.exports = new Cache();