  
var Pool = require('pg').Pool
var pool = new Pool({
user: "postgres",
password: "213113",
host: "192.168.56.102",
port: 5432,
database: "kkk"
})

module.exports = pool