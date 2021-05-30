const pgsql = require('pg');
const dbConfig = require("../configs/db.config.js");

const connection = new pgsql.Pool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

module.exports = connection;