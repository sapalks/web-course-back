var db = require("./db")

db.query("DELETE FROM book");
db.query("ALTER SEQUENCE book_bookid_seq RESTART");
db.query("DELETE FROM writer");
db.query("ALTER SEQUENCE writer_writerid_seq RESTART");
db.end();