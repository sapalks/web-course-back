const Room = require('../ID/room')
const dateFormat = require('dateformat')
const rooms = []
function checkRoomUsers(roomId, username, res) {
    var room = rooms.find(room => room.getRoomId() === roomId)
    if (!room) {
        rooms.push(new Room(roomId))
        return true
    }
    if (room.getUser(username)) {
        res.render('../public/html/chat.html', { response: 'false' })
        return false
    }
    return true
}
function disconnect(req, room, username) {
    req.on('close', function () {
        usrs = room.getUsers()
        if (usrs.length > 0) {
            room.deleteUser(username)
        }
    })
}
function setHeader(res) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.setHeader("Cache-Control", "no-cache, must-revalidate")
}
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc)
}
const main = (req, res) => {
    res.render('../public/html/index.html')
}
const join = (req, res) => {
    const roomId = req.query.roomId
    const username = req.query.username
    if (checkRoomUsers(roomId, username, res)) {
        res.render('../public/html/chat.html', { response: 'true' })
    }
}
const subscribe = (req, res) => {
    const roomId = req.query.roomId
    const username = req.query.username
    setHeader(res)
    if (checkRoomUsers(roomId, username, res)) {
        var room = rooms.find(room => room.getRoomId() === roomId)
        room.createUser(res, username)
        disconnect(req, room, username)
    }
}

const publish = (req, res) => {
    var message, roomId, username
    req.on('data', function (chunk) {
        data = JSON.parse(chunk)
        message = data.message;
        roomId = data.roomId;
        username = data.username;
    }).on('end', function () {
        const room = rooms.find(room => room.getRoomId() === roomId)
        usrs = room.getUsers()
        usrs.forEach(user => { user.res.end(`${username}&${new Date().format('HH:MM')}&${message}`) })
        res.end('ok');
    })
}
const fillingFieldOnline = (req, res) => {
    var roomId = req.query.roomId
    req.on('data', function () {
    }).on('end', function () {
        const room = rooms.find(room => room.getRoomId() === roomId)
        usrs = room.getUsers()
        var array = []
        usrs.forEach(user => { array.push(user.username) })
        var out = array.join(', ')
        usrs.forEach(user => { user.res.end(`${out}`) })
        res.end('ok')
    })
}
exports.main = main
exports.join = join
exports.subscribe = subscribe
exports.publish = publish
exports.fillingFieldOnline = fillingFieldOnline