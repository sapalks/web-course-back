const pg = require("./db.connect.js")

function create (picture, callback) {
    pg.query(`INSERT INTO picture (picture_name, description, extension, data, author_id, is_deleted)
    VALUES('${picture.pictureName}', '${picture.description}', '${picture.extension}', '${picture.data}', ${picture.authorId}, DEFAULT);`,
    (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, {message: 'Добавленно'})
    })
}

function readAll (callback) {
    pg.query('SELECT * FROM picture WHERE is_deleted = false', (err, res) => {
        if (err) {
            callback(err, null)
            return;
        }
        callback(null, { ...res.rows })
    })
}

function readById (id, callback) {
    pg.query(`SELECT * FROM picture WHERE picture_id = ${id} AND is_deleted = false`, (err, res) => {
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

function readByAuthorId (authorId, callback) {
    pg.query(`SELECT * FROM picture WHERE author_id = ${authorId} AND is_deleted = false`, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        if (res.rowCount == 0) {
            callback({ status: '404' }, null)
            return
        }
        callback(null, { ...res.rows })
    })
}

 function update (picture, callback) {
    pg.query(`UPDATE picture 
    SET picture_name = '${picture.pictureName}', description = '${picture.description}',
    extension = '${picture.extension}', data = '${picture.data}', author_id = ${picture.authorId} 
    WHERE picture_id = ${picture.id};`, (err, res) => {
        if (err) {
            callback(err, null)
            return
        }
        if (res.rowCount == 0) {
            callback({ status: '404' }, null)
            return
        }
        callback(null, {...picture });
    })
}

function markAsDeleted (id, callback) {
    pg.query(`UPDATE picture SET is_deleted = true WHERE picture_id = ${id};`, (err, res) => {
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
    readByAuthorId: readByAuthorId,
    update: update,
    markAsDeleted: markAsDeleted
}
