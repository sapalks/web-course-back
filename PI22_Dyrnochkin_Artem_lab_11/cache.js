const NodeCache= require( "node-cache" );
const Cache_m = new NodeCache({ stdTTL: 100, checkperiod: 100 });
let lastKey = null;

class Cache {
  async save(key, value) {
       lastKey = null
       Cache_m.set(key, value)
   }

   async get(key) {
       const _key = Cache_m.get(key);
       if (_key) {
           lastKey = key
           return _key
       }
   }

   async delete(key) {
       await Cache_m.del(key)
   }

   async getLastKey() {
        return lastKey
    }

}
module.exports = new Cache();