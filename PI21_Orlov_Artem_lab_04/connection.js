const Pool = require('pg').Pool
const pool = new Pool({
    user: 'artem',
    host: '192.168.1.14',
    database: 'jdmshop',
    password: '123123',
    port: 5432,
})

module.exports = pool