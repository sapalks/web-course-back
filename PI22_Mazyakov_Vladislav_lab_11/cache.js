const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
let lastKey = null;

class Cache {
  async save(key, value) {
       lastKey = null
       myCache.set(key, value)
   }

   async get(key) {
       const _key = myCache.get(key);
       if (_key) {
           lastKey = key
           return _key
       }
   }

   async delete(key) {
       await myCache.del(key)
   }

   async getLastKey() {
        return lastKey
    }

}
module.exports = new Cache();
