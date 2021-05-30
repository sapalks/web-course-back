const Pool = require('pg').Pool

const pool = new Pool({
    host: '127.0.0.2',
    user: 'postgres',
    password: '123321',
    port: 5432,
    database: 'lab_4'
  })

  module.exports = pool;