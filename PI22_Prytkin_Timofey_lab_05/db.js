const Pool = require('pg').Pool

const pool = new Pool({
    //user: "swedl",
    //password: "postgres",
    //host: "localhost",
    //port: 5432,
    //database: "taskmanager"

    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool