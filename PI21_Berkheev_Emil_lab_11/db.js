const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'AL2Ah3LcaanW',
    port: 5432,
    database: 'cyber_database'
  })

  module.exports = pool;