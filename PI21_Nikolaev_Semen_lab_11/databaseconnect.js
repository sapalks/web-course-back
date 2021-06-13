const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'utjvtnhbz228',
    port: 5432,
    database: 'HumanResources'
  })

  module.exports = pool;