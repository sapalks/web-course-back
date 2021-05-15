const Pool = require('pg').Pool

const pool = new Pool({
    user: "Rafael",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "Ip"
})

module.exports = pool