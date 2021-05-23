var db = require("../db")

db.query("DELETE FROM employee");
db.query("ALTER SEQUENCE employee_id_seq RESTART");
db.query("DELETE FROM department");
db.query("ALTER SEQUENCE department_id_seq RESTART");
db.end();