const express = require('express')
const app = express()
const port = 3000
const dateFormat = require('dateformat')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const userModel = require('./model/user')

const chatBot = 'Chat-Bot'

app.use(express.static('public'));

io.on('connection', function(socket) {

    socket.on('sending-message', function(message) {
        const user = userModel.getUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, message))
    });

    socket.on('join', function({ username, room }) {

        // check the uniqueness of the name
        if (!isUniqName(username, room)) {
            socket.emit('error')
            return
        }

        //const user = createUser(socket.id, username, room)
        const user = userModel.createUser(socket.id, username, room)

        // subscribe the socket to a given channel
        socket.join(user.room)
        socket.emit('first-connection')

        // sending events to all the connected clients other than the sender
        socket.broadcast.to(user.room).emit('message', formatMessage(chatBot, `${user.username} connected to the chat`))

        updatingListUsers(user.room)
    });

    socket.on('disconnect', function() {
        const user = userModel.deleteUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', formatMessage(chatBot, `${user.username} disconnected from chat`))
            updatingListUsers(user.room)
        }
    });
});

server.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc)
}

function formatMessage(username, text) {
    return { username, text, time: new Date().format('HH:MM') }
}

function updatingListUsers(room) {
    io.to(room).emit('list-users', { users: userModel.getRoomUsers(room) })
}

function isUniqName(username, room) {
    if(userModel.getUsers().find(user => user.username === username && user.room === room)) {
        return false
    }
    return true
}