const Pool = require('pg').Pool
const keys = require('./util/keys')

const pool = new Pool({
    user: keys.postgres.user,
    password: keys.postgres.password,
    host: keys.postgres.host,
    port: keys.postgres.port,
    database: keys.postgres.database
})

module.exports = pool