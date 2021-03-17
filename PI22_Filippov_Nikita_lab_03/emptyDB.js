const sql = require("./models/db.model.js")

sql.query('TRUNCATE HOTELS CASCADE');
sql.query('ALTER SEQUENCE hotels_seq RESTART');
sql.query('TRUNCATE COUNTRIES CASCADE');
sql.query('ALTER SEQUENCE countries_seq RESTART');
sql.end();