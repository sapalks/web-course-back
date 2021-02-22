const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'giz911',
    host: 'localhost',
    posrt: 5432,
    database: 'TaskManager'
})

module.exports = pool