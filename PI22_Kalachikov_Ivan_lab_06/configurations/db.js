const Pool = require('pg').Pool
const keys = require('./keys')

const pool = new Pool({
    user: keys.postgres.user,
    password: keys.postgres.password,
    database: keys.postgres.database,
    host: "localhost",
    port: 5432
})

module.exports = pool