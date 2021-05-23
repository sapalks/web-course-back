const Pool = require('pg').Pool
DB_LINK = "postgres://dahbkdfgcymctp:d4255431cb37dba965c262146e8a8195d9561d05ae06daf5733a4040f0192cd6@ec2-54-87-112-29.compute-1.amazonaws.com:5432/ddocrs5ir58gnp"

const pool = new Pool({
    connectionString : DB_LINK,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool

