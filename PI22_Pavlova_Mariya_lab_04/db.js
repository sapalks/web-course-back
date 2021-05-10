const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "ip_lab3"
})

module.exports = pool