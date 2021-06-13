const NodeCache= require( "node-cache" );
const myCache  = new NodeCache({ stdTTL: 100, checkperiod: 100 });
let lastKey = null;

class Cache {
    async save(key, value) {
        lastKey = key
        myCache.set(key, value)
    }

    async get(key) {
        return myCache.get(key);
    }

    async getStats(){

        return myCache.getStats();
    }

    async clear(){
        lastKey=null;
        await myCache.flushAll();
    }

    async getLastKey() {
        return lastKey
    }
}
module.exports = new Cache();