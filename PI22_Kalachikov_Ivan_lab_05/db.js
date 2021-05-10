var Pool = require('pg').Pool
var pool = new Pool({
    user: "ytbkdjllfunhau",
    password: "03a3ceccfc71ec42af4dceaceca0a69e273c8f510fe7a324127c05cea5817ab7",
    host: "ec2-52-87-107-83.compute-1.amazonaws.com",
    port: 5432,
    database: "df6br4ovbspa3s",
    ssl: {rejectUnauthorized: false}
})

module.exports = pool