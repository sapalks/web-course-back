const Pool = require('pg').Pool

const pool = new Pool ({
    host: "localhost",
    user: "postgres",
    password: "1",
    database: "forip"
})
module.exports =pool;
