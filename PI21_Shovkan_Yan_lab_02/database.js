const Pool = require('pg').Pool

const pool = new Pool({
    host: '192.168.1.38',
    user: 'postgres',
    password: '1234',
    port: 5432,
    database: "LaborExchange"
  })

  module.exports = pool;