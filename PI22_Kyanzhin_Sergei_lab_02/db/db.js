const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: '12345678',
    host: 'localhost',
    posrt: 5432,
    database: 'postgres'
})

module.exports = pool