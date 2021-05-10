const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Lab2IP',
    password: '111',
    port: 5432,
})

module.exports = pool