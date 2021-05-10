var db = require("./db")

db.query("DELETE FROM student");
db.query("ALTER SEQUENCE student_seq RESTART");
db.query("DELETE FROM education");
db.query("ALTER SEQUENCE education_seq RESTART");
db.end();