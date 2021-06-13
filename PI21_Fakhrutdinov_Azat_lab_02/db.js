  
var Pool = require('pg').Pool
var pool = new Pool({
user: "postgres",
password: "root",
host: "localhost",
port: 5433,
database: "node_postgres"
})

module.exports = pool