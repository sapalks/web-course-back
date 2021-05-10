const sql = require("./db.model.js");

const Countries = function (countrie) {
    this.Name = countrie.Name;
    this.Language = countrie.Language;
};

Countries.create = (newCountrie, result) => {
    sql.query(`INSERT INTO Countries VALUES(DEFAULT, '${newCountrie.Name}', '${newCountrie.Language}',DEFAULT) RETURNING id;`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        result(null, { Id: res.rows[0].id, ...newCountrie });
    });
};

Countries.read = (key, result) => {
    if (key) {
        sql.query(`SELECT ID,Name,Language FROM Countries WHERE ID = '${key}' AND isDeleted = false`, (err, res) => {
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
        sql.query(`SELECT ID,Name,Language FROM Countries WHERE isDeleted = false`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { ...res.rows });
        })
    }
};

Countries.update = (key, countrie, result) => {
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

Countries.delete = (key, result) => {
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

module.exports = Countries;