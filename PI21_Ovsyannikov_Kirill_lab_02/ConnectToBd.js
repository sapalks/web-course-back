const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'qwerty12345',
    port: 5432,
    database: "lab2ip"
  })

  module.exports = pool;