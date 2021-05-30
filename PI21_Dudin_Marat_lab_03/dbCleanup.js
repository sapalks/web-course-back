var db = require("./db")

db.query("DELETE FROM schoolboy");
db.query("ALTER SEQUENCE schoolboy_seq RESTART");
db.query("DELETE FROM direction");
db.query("ALTER SEQUENCE direction_seq RESTART");
db.end();