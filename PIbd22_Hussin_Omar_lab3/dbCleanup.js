var db = require("./db")

db.query("DELETE FROM person");
db.query("ALTER SEQUENCE person_seq RESTART");
db.query("DELETE FROM room");
db.query("ALTER SEQUENCE room_seq RESTART");
db.end();