const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    port: 5432,
    database: 'lab_4'
  })

  module.exports = pool;