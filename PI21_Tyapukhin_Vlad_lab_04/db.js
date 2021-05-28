const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Stanlox73rus',
    port: 5432,
    database: 'lab_04'
  })

  module.exports = pool;