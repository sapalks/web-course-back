const pg = require('pg')

const connection = new  pg.Pool ({
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    password: '102030',
    database: 'Gallery'
})
module.exports = connection
