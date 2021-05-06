var Pool = require('pg').Pool
var pool = new Pool({
user: "postgres",
password: "1337",
host: "localhost",
port: 5432,
database: "library_database"
})

module.exports = pool