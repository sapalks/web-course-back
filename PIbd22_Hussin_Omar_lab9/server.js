const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./ID/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers, getAllUsers } = require('./ID/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = 3000 || process.env.port
app.use(express.static(path.join(__dirname, 'Source')))

const botName = 'Group'
const checkUsername = (username, room) =>
    getAllUsers().find(usr => usr.username === username && usr.room === room) ? false : true
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {

        if (!checkUsername(username, room)) {
            socket.join('error')
            socket.emit('message', formatMessage(botName, 'This username already exist, press leave button and change your username'))
            return
        }
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message', formatMessage(botName, 'Добро пожаловать!'))
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if (!user) return

        if (user) io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))

        
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
})
server.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});

