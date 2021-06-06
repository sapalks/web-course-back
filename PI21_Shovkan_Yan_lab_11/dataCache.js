const node_cache = require("node-cache");
const Cache = new node_cache({ stdTTL: 100, checkperiod: 120 });

let neededKey = null;

class dataCache {

    async addEntry(key, value) {
        neededKey = key
        Cache.set(key, value)
    }

    async deleteKey(key) {
        await Cache.del(key)
        neededKey = null
    }

    async getNeededKey() {
        return neededKey
    }

    async isCached(key) {
        if (Cache.get(key)) {
            neededKey = key
            return Cache.get(key)
        }
    }
}
module.exports = new dataCache();