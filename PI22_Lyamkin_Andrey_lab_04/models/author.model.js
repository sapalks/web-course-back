const pg = require("./db.connect.js")

function create (author, callback) {
    pg.query(`INSERT INTO author (nickname, is_deleted) VALUES('${author.nickname}', DEFAULT);`, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, {message: 'Добавленно'})
    })
}

function readAll (callback) {
    pg.query('SELECT * FROM author WHERE is_deleted = false', (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, { ...res.rows })
    })
}

function readById (id, callback) {
    pg.query(`SELECT * FROM author WHERE author_id = ${id} AND is_deleted = false`, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        if (res.rowCount == 0) {
            callback({ status: '404' }, null)
            return
        }
        callback(null, { ...res.rows[0] })
    })
}

 function update (author, callback) {
    pg.query(`UPDATE author SET nickname = '${author.nickname}' WHERE author_id = ${author.id};`, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        if (res.rowCount == 0) {
            callback({ status: '404' }, null)
            return
        }
        callback(null, {...author });
    })
}

function markAsDeleted (id, callback) {
    pg.query(`UPDATE author SET is_deleted = true WHERE author_id = ${id};`, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        if (res.rowCount == 0) {
            callback({ status: '404' }, null)
            return
        }
        callback(null, 'Удалено')
    })
}

module.exports = {
    create: create,
    readAll: readAll,
    readById: readById,
    update: update,
    markAsDeleted: markAsDeleted
}