const pgsql = require('pg');
const db = require("../data-base.js");

const connection = new pgsql.Pool({
	host: db.host,
	user: db.user,
	password: db.password,
	database: db.database
});

module.exports = connection;