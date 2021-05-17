const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '52424222',
    port: 5432,
    database: 'hotel'
  })

  module.exports = pool;