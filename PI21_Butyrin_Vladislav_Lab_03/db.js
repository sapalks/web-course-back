const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "301839b",
    host: "localhost",
    port: "1111",
    database: "node_postgres"
})

module.exports = pool

