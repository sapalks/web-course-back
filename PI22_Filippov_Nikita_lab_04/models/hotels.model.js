const sql = require("./db.model.js");

class Hotels {
    create(newHotel, result) {
        sql.query(`INSERT INTO Hotels VALUES(DEFAULT, '${newHotel.Name}', '${newHotel.Rating}','${newHotel.CountrieID}','${newHotel.Address}','${newHotel.ContactNumber}',DEFAULT) RETURNING id;`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { Id: res.rows[0].id, ...newHotel });
        });
    }

    read(key, result) {
        if (key) {
            sql.query(`SELECT ID, Name, rating, CountrieID, Address, ContactNumber FROM Hotels WHERE ID = '${key}' AND isDeleted = false ORDER BY ID;`, (err, res) => {
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
            sql.query(`SELECT ID, Name, rating, CountrieID, Address, ContactNumber FROM Hotels WHERE isDeleted = false ORDER BY ID;`, (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { ...res.rows });
            })
        }
    }
    readByCountrie(key, result) {
        sql.query(`SELECT ID,Name,Rating,CountrieID,Address,ContactNumber FROM Hotels WHERE CountrieID = '${key}' AND isDeleted = false ORDER BY ID;`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if (res.rowCount == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { ...res.rows });
        })
    }
    update(key, hotel, result) {
        sql.query(`UPDATE Hotels SET Name = '${hotel.Name}', Rating = '${hotel.Rating}',CountrieID = '${hotel.CountrieID}',Address = '${hotel.Address}',ContactNumber = '${hotel.ContactNumber}' WHERE ID = '${key}';`, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if (res.rowCount == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { Id: key, ...hotel });
        })
    }
    delete(key, result) {
        sql.query(`UPDATE Hotels SET isDeleted = true WHERE ID = '${key}';`, (err, res) => {
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

module.exports = new Hotels();