const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers, getAllUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'front')))

const notification = 'Оповещение'

const checkUsername = (username, room) =>
    getAllUsers().find(usr => usr.username === username && usr.room === room) ? false : true


io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {

        if (!checkUsername(username, room)) {
            socket.join('error')
            socket.emit('message', formatMessage(notification, 'Это имя уже занято, пожалуйста, покиньте чат и введите другое имя'))
            return
        }

        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        socket.emit('message', formatMessage(notification, 'Добро пожаловать в чат!'))

        socket.broadcast.to(user.room).emit('message', formatMessage(notification, `${user.username} присоединился`))

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

        if (user) io.to(user.room).emit('message', formatMessage(notification, `${user.username} покинул чат`))

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
})


server.listen(PORT, () => console.log('Server running on port: ' + PORT))