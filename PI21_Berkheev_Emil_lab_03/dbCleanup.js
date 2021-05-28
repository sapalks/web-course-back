var db = require("./db")

db.query("DELETE FROM player");
db.query("ALTER SEQUENCE player_seq RESTART");
db.query("DELETE FROM team");
db.query("ALTER SEQUENCE team_seq RESTART");
db.end();