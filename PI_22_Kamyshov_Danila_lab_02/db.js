const Pool = require('pg').Pool

const pool = new Pool({
    user: "Gentle_Dan",
    password: "594634",
    host: "localhost",
    port: 5432,
    database: "kamyshov_ip"
})

module.exports = pool