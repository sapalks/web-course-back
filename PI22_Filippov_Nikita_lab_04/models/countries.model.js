const sql = require("./db.model.js");

class Countries {
    create(newCountrie, result) {
        sql.query(`INSERT INTO Countries VALUES(DEFAULT, '${newCountrie.Name}', '${newCountrie.Language}',DEFAULT) RETURNING id;`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { Id: res.rows[0].id, ...newCountrie });
        });
    }
    read(key, result) {
        if (key) {
            sql.query(`SELECT ID,Name,Language FROM Countries WHERE ID = '${key}' AND isDeleted = false ORDER BY ID;`, (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    result(err, null);
                    return;
                }
                if (res.rowCount == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                result(null, { ...res.rows[0] });
            })
        }
        else {
            sql.query(`SELECT ID,Name,Language FROM Countries WHERE isDeleted = false ORDER BY ID;`, (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { ...res.rows });
            })
        }
    }
    update(key, countrie, result) {
        sql.query(`UPDATE Countries SET Name = '${countrie.Name}', Language = '${countrie.Language}' WHERE ID = '${key}';`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if (res.rowCount == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { Id: key, ...countrie });
        })
    }

    delete(key, result) {
        sql.query(`UPDATE Countries SET isDeleted = true WHERE ID = '${key}';`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if (res.rowCount == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, 'Удалено успешно');
        })
    }
}

module.exports = new Countries();