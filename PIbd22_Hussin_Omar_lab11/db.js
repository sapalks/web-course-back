const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: "738338337",
    port: 5432,
    database: 'hussin',
  })

  module.exports = pool;