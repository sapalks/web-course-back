var Pool = require('pg').Pool
var pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})
module.exports = pool 