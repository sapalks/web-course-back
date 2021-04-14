const pgsql = require('pg');
const dbconfig = require('../configs/db.config')

const client = new pgsql.Client({
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
  port: dbconfig.port,
  host: dbconfig.host,
  ssl: dbconfig.ssl
});

client.connect();

module.exports = client;