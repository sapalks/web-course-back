const Pool = require('pg').Pool

const pool = new Pool({
    user: "gpwpkhytorioor",
    password: "4a56b548227ee0ac27187f33ca7cab2912496a22d1400ca6eeeacd5c281fce0f",
    host: "ec2-34-200-94-86.compute-1.amazonaws.com",
    port: 5432,
    database: "d4fmtnpa5vcagj",
    ssl: { rejectUnauthorized: false }
})

module.exports = pool