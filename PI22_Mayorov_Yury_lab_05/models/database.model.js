const pgsql = require('pg');
const db = require("../data-base.js");

const connection = new pgsql.Pool({
	user: db.user,
	password: db.password,
	database: db.database,
	port: db.port,
	host: db.host,
	ssl: db.ssl
});

module.exports = connection;