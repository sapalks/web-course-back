const Pool = require('pg').Pool

const pool = new Pool({
    host: 'ec2-35-174-35-242.compute-1.amazonaws.com',
    user: 'zqzxwyvwjejwsh',
    password: '0a692622b31b30cc68ed7782e9ec7846f20a314599731ab3ca74be355717a446',
    port: 5432,
    database: 'da46een1qq4iaa',
    ssl: {rejectUnauthorized: false}
  })

module.exports = pool;