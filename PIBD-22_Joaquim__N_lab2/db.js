const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: "albertinan1",
    port: 5432,
    database: 'constrution'
  })

  module.exports = pool;