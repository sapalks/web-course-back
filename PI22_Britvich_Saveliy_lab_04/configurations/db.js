var Pool = require('pg').Pool
var pool = new Pool({
user: "postgres",
password: "Sandmen2014",
host: "localhost",
port: 5432,
database: "postgres"
})

module.exports = pool