const express = require('express')
const app = express()
const port = 3000
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

        if(userModel.getUsers().find(user => user.username === username && user.room === room)) {
            socket.emit('error')
            return
        }

        const user = userModel.createUser(socket.id, username, room)

        socket.join(user.room)
        socket.emit('first-connection')

        socket.broadcast.to(user.room).emit('message', formatMessage(chatBot, `${user.username} connected to the chat`))

        io.to(user.room).emit('list-users', { users: userModel.getRoomUsers(user.room) })
    });

    socket.on('disconnect', function() {
        const user = userModel.deleteUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', formatMessage(chatBot, `${user.username} disconnected from chat`))
            io.to(user.room).emit('list-users', { users: userModel.getRoomUsers(user.room) })
        }
    });
});

server.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

function formatMessage(username, text) {
    return { username, text }
}

