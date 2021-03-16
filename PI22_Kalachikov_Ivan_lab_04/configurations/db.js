var Pool = require('pg').Pool
var pool = new Pool({
user: "postgres",
password: '3228',
host: "localhost",
port: 5432,
database: "js_lab"
})

module.exports = pool