const cashe = require( "node-cache" );
const cashe_ = new cashe({ stdTTL: 100, checkperiod: 100 });
let lastKey = null;

class Cache {
  async save(key, value) {
       lastKey = null
       cashe_.set(key, value)
   }

   async get(key) {
       const _key = cashe_.get(key);
       if (_key) {
           lastKey = key
           return _key
       }
   }

   async delete(key) {
       await cashe_.del(key)
   }

   async getLastKey() {
        return lastKey
    }

}
module.exports = new Cache();